const Blog = require("../models/blog.model");
const Student = require("../models/student.model");
const fs = require('fs')
const path = require('path');


module.exports.studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ msg: 'Credentials Required' })
        }
        const student = await Student.findOne({ username: username });
        if (!student) {
            return res.status(401).json({ msg: 'Student not Found' })
        }
        if (!student.isPasswordCorrect(password)) {
            res.status(404).json("msg: Invalid password")
        }
        const token = await student.generateAccessToken();
        const newStudent = await Student.findOne(student._id).select("-password")
        const options = {
            secure: true,
            httpOnly: true,
        }
        return res.status(201).cookie("token", token, options).json({ student: newStudent })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.studentLogout = async (req, res) => {
    try {
        const option = {
            httpOnly: true,
            secure: true
        }
        res.status(200).clearCookie("token", option).json({ message: "Logged out Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports.postBlog = async (req, res) => {
    try {
        const { title, readTime, description } = req.body;
        const localPath = req.file.path;
        if (req.user && req.user.role == 'student') {
            const studentId = req.user._id
            const newBlog = await Blog.create({
                title,
                readTime,
                description,
                featured: localPath,
                created_by_student: studentId,
                creator_name: req.user.username
            })
            return res.status(201).json({ blog: newBlog })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports.getBlog = async (req, res) => {
    try {
        if (req.user && req.user.role == 'student') {
            const id = req.user._id;
            const blogs = await Blog.find({ created_by_student: id }).sort({ createdAt: -1 })
            return res.status(200).json({ blogs: blogs })
        }
        else {
            return res.status(401).json({ message: 'Something Wrong' })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
module.exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        console.log(blog.created_by_student);
        console.log(req.user._id);
        if (blog.created_by_student.toString() != req.user?._id.toString()) {
            return res.status(401).json({ message: 'Unauthrized fbdfb access' })
        }
        const updatedData = req.body;
        if (req.file) {
            const filePath = path.join(__dirname, '..', blog.featured)
            await new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('File deletion error:', err);
                        return reject(err);
                    }
                    updatedData.featured = req.file.path;
                    resolve();
                });
            });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            $set: updatedData
        }, {
            new: true
        })
        if (!updatedBlog) {
            return res.status(400).json({ msg: "Could not update Blog" })
        }
        return res.status(200).json({ blog: updatedBlog })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
module.exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ msg: "Could not find Blog" })
        }
        if (blog.created_by_student.toString() != req.user?._id.toString()) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }
        const filePath = path.join(__dirname, '..', blog.featured)
        await new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('File deletion error:', err);
                    return reject(err);
                }
                resolve();
            });
        });
        await Blog.findByIdAndDelete(blogId);
        return res.status(200).json({ msg: "Blog deleted successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}