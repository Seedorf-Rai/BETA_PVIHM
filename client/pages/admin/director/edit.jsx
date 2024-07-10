


import { Link, Navigate, useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patchWelcome } from "../../../src/slice/admin/welcomeSlice";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { patchCeoMsg } from "../../../src/slice/admin/ceoSlice";
import { patchDirector } from "../../../src/slice/admin/directorSlice";

function EditDirector(){
    const {id} = useParams();
    const [nextPage , setNextPage] = useState(false);
    const [value, setValue] = useState('');
    const [image,setImage] = useState(null);
    const dispatch = useDispatch()
   async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        console.log(value);
        if(value){
            formData.append('message',value);
        }
        if(image){
            formData.append('director',image);
        }
        // console.log(formData);
        const response = await dispatch(patchDirector({id, data : formData}))
        if(patchDirector.fulfilled.match(response)){
            toast.success('Director Message Updated Sucessfully!', {
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
            toast.error('Could not change Director Message')
        }
    }
    if(nextPage){
        return <Navigate to={'/admin/director'} ></Navigate>
    }
    return (
        <>
          <Link to={'/admin/director'} >
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

export default EditDirector