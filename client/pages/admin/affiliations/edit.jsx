import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { patchAffiliation } from "../../../src/slice/admin/affiliationSlice";



export default function EditAffiliation(){
    const {id} = useParams();
    const dispatch = useDispatch()
    const [nextPage,setNextPage] = useState(false)

    const affs = useSelector((state)=>state.affiliation.affiliations)

    const aff = affs.find(a=>a._id === id)
    const [image,setImage] = useState(null)
    const [value,setValue] = useState('')

    useEffect(()=>{
       if(aff){
        setValue(aff.description)
       }
     },[aff])

  async   function handleEdit(){
        const formData = new FormData();
        formData.append('description',value)

        if(image){
            formData.append('affiliation',image)
        }
        const response = await dispatch(patchAffiliation({id:id,data:formData}));
        if(patchAffiliation.fulfilled.match(response)){
            toast.success('Affiliation Updated Successfully!', {
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
            toast.error('Could not update Affiliation')
        }
     }

     if(nextPage){
        return <Navigate to={'/admin/aff'} ></Navigate>
     }

    return(
        <>
        <Link to={'/admin/aff'}>
           <button className="p-3 bg-cyan-600 mt-5" >
            Go Back
           </button>
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
            <button onClick={()=>{handleEdit()}} className="p-2 bg-green-500 mt-10 rounded" >Save Changes</button>
          </div>
          <ToastContainer></ToastContainer>
        </>
    )
}