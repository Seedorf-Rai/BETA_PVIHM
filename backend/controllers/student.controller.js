const Student = require("../models/student.model");


module.exports.studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ msg: 'Credentials Required' })
        }
        const student = await Student.findOne({username: username});
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
        return res.status(201).cookie("token",token,options).json({student: newStudent})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.studentLogout = async (req, res) => {
    try{
        const option = {
            httpOnly : true,
            secure : true
           }
           res.status(200).clearCookie("token",option).json({message: "Logged out Successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}