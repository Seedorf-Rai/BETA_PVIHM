import { Link, Navigate, useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchWelcome } from "../../../src/slice/admin/welcomeSlice";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function EditWelcome(){
    const {id} = useParams();
    const [nextPage , setNextPage] = useState(false);
    const [value, setValue] = useState('');
    const [image,setImage] = useState(null);
    const dispatch = useDispatch()
   async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        console.log(value);
        console.log(image);
        if(value){
            formData.append('description',value);
        }
        if(image){
            formData.append('welcome',image);
        }
        // console.log(formData);
        const response = await dispatch(patchWelcome({id, data : formData}))
        if(patchWelcome.fulfilled.match(response)){
            toast.success('Welcom Section Changed Sucessfully!', {
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
            toast.error('Could not change Welcome Section')
        }
    }
    if(nextPage){
        return <Navigate to={'/admin/welcome'} ></Navigate>
    }
    return (
        <>
          <Link to={'/admin/welcome'} >
           <button className="p-2 bg-yellow-300" >
             Go Back
           </button>
          </Link>
          <div className="my-10 pe-20">
            <div className="flex flex-col">
                <label htmlFor="image">
                    Change Image
                </label>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} name="image" id="" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">
                    Change Description:
                </label>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <button onClick={handleSubmit} className="p-2 bg-green-500 mt-10 rounded" >Save Changes</button>
          </div>
          <ToastContainer></ToastContainer>
        </>
    )
}

export default EditWelcome