import { useState } from "react";
import ReactQuill from "react-quill"
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { postAffiliation } from "../../../src/slice/admin/affiliationSlice";



 function AddAffiliation(){
    const [nextPage , setNextPage] = useState(false);
    const [value, setValue] = useState('');
    const [image,setImage] = useState(null);
    const dispatch = useDispatch()

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('affiliation',image)
        formData.append('description',value);

        const response = await dispatch(postAffiliation({data:formData}))
        if(postAffiliation.fulfilled.match(response)){
            toast.success('Affiliation Added Successfully!', {
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
            toast.error('Could not add Affiliation')
        }
    }
    if(nextPage){
        return <Navigate to={'/admin/aff'} ></Navigate>
    }
    return(
        <>
         <Link to={'/admin/aff'} >
          <button className="p-3 mt-5 rounded bg-cyan-600" >Go Back</button>

          </Link>
          <div className="my-10 pe-20">
            <div className="flex flex-col">
                <label htmlFor="image">
                    Change Image
                </label>
                <input  className="mt-4" type="file" onChange={(e)=>setImage(e.target.files[0])} name="image" id="" />
            </div>
            <div className="flex mt-8 flex-col">
                <label htmlFor="">
                    Change Description:
                </label>
                <ReactQuill className="mt-4" theme="snow" value={value} onChange={setValue} />
            </div>
            <button onClick={handleSubmit} className="p-2 bg-green-500 mt-10 rounded" >Save Changes</button>
          </div>
          <ToastContainer></ToastContainer>
        </>
    )
}

export default AddAffiliation