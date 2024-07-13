import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { postCredits } from "../../../src/slice/admin/creditSlice";
import { toast, ToastContainer } from "react-toastify";



function AddCredits(){


    const [image,setImage] = useState(null)
    const dispatch = useDispatch()
    const [nextPage,setNextPage] = useState(false)

    async function handleSubmit(){
        const formData = new FormData()
        if(image){
            formData.append('credit-transfers',image)
            const response = await dispatch(postCredits({data:formData}))
            if(postCredits.fulfilled.match(response)){
                toast.success('Image Added Successfully', {
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
                toast.error(errorMessage || 'Could not Add Image', {
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
        else{
            return
        }
    }
    if(nextPage){
        return <Navigate to={'/admin/credits'} ></Navigate>
    }
    return(
        <>
         <Link to={'/admin/credits'} >
          <button className="mt-5 p-3 rounded bg-cyan-600" >
            Go Back
          </button>
         </Link>
         <div className="mt-10">
            <div className="flex flex-col">
                <label htmlFor="">Add Image</label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="" />
            </div>
            <button className="mt-5 p-3 bg-green-500 rounded" onClick={handleSubmit} >Submit</button>

         </div>
         <ToastContainer></ToastContainer>
        </>
    )
}
export default AddCredits