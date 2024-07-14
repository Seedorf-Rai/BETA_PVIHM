import { useState } from "react"
import ReactQuill from "react-quill"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { postBlog } from "../../../src/slice/admin/blogSlice"
import { toast, ToastContainer } from "react-toastify"



function AddBlog(){

    const dispatch = useDispatch()
    const errorMessage = useSelector((state)=>state.blogs.errorMessage)

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState(null)
    const [readTime,setReadTime] = useState('')
    const [nextPage,setNextPage] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('blog-image',image)
        formData.append('readTime',readTime)

        const response = await dispatch(postBlog({data:formData}))
        if(postBlog.fulfilled.match(response)){
            toast.success('Blog Added Sucessfully!', {
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
            toast.error(errorMessage || 'Could not Add the Blog', {
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
                <input onChange={(e)=>setTitle(e.target.value)} placeholder="Blog Title" type="text" className="bg-transparent rounded-md mt-4 " name="" id="" />
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
                <input type="text" onChange={(e)=>setReadTime(e.target.value)} placeholder="eg: 20 min read" className="bg-transparent rounded-md mt-4 " name="" id="" />
            </div>
          </div>
          <button onClick={handleSubmit} className="p-3 rounded mt-5 bg-green-500" >
            Save Blog
          </button>
          <ToastContainer></ToastContainer>
        </>
    )
}

export default AddBlog