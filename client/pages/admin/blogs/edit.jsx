import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom"
import { patchBlog } from "../../../src/slice/admin/blogSlice"
import { toast, ToastContainer } from "react-toastify"



function EditBlog(){

    const {id} = useParams()

    const dispatch = useDispatch()
    const errorMessage = useSelector((state)=>state.blogs.errorMessage)
    const allBlogs = useSelector((state)=>state.blogs.blogs)
    const blog = allBlogs.find((blog)=>blog._id === id)

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState(null)
    const [readTime,setReadTime] = useState('')
    const [nextPage,setNextPage] = useState(false)

    async function handleUpdate(e){

        const formData = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        if(image){
            formData.append('blog-image',image)
        }
        formData.append('readTime',readTime)

        const response = await dispatch(patchBlog({id:id,data:formData}))
        if(patchBlog.fulfilled.match(response)){
            toast.success('Blog Updated Sucessfully!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
               setTimeout(()=>{
                setNextPage(true)
               },2000);
        }
        else{
            toast.error(errorMessage || 'Could not Update the Blog', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
        }

    }

    useEffect(()=>{
        if(blog){
            setTitle(blog.title)
            setDescription(blog.description)
            setReadTime(blog.readTime)
        }
    },[blog])

    if(nextPage){
        return <Navigate to={'/admin/blogs'} ></Navigate>
    }

    return(
        <>
          <Link to={'/admin/blogs'} >
           <button className="p-3 bg-cyan-600 mt-5 rounded">
             Go Back
           </button>
          </Link>
          <div className="mt-10  pe-36">
            <div className="flex flex-col">
                <label htmlFor="">Title: </label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Blog Title" type="text" className="bg-transparent rounded-md mt-4 " name="" id="" />
            </div>
            <div className="flex mt-5 flex-col">
                <label htmlFor="">Add Image: </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" className="bg-transparent rounded-md mt-4 " name="" id="" />
            </div>
            <div className="flex mt-5 flex-col">
                <label htmlFor="">Add Description: </label>
                <ReactQuill className="mt-4" value={description} onChange={setDescription} theme="snow"/>
            </div>
            <div className="flex mt-5 flex-col">
                <label htmlFor="">Reading Time: </label>
                <input type="text" value={readTime} onChange={(e)=>setReadTime(e.target.value)} placeholder="eg: 20 min read" className="bg-transparent rounded-md mt-4 " name="" id="" />
            </div>
          </div>
          <button onClick={()=>{handleUpdate()}} className="p-3 rounded mt-5 bg-green-500" >
            Update Blog
          </button>
          <ToastContainer></ToastContainer>
        </>
    )
}

export default EditBlog