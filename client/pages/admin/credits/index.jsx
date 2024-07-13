import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteCredits, fetchCredits } from "../../../src/slice/admin/creditSlice";
import { toast, ToastContainer } from "react-toastify";




function Credits(){

    const credits = useSelector((state)=>state.credits.credits)
    const dispatch = useDispatch();

   async function handleDelete(id){
            const response = await dispatch(deleteCredits({id:id}))
            if(deleteCredits.fulfilled.match(response)){
                toast.success('Image Deleted Successfully', {
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
            else{
                toast.error(errorMessage || 'Could not Delete Image', {
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
     dispatch(fetchCredits())
    },[dispatch])

    return(
        <>
         <Link to={'/admin/credits/add'} >
          <button className="mt-5 p-3 rounded bg-cyan-600" >Add Credits</button>
         </Link>
         <h1>All Credits</h1>
         <div className="flex flex-col gap-10">
            {
                credits.map((credit,key)=>{
                    return(
                        <div key={credit._id} className="flex justify-between w-[600px] rounded-lg py-10 px-4 bg-[#283046]">
               <img className="w-[200px] h-[150px] object-cover " src={`http://localhost:5000/${credit.featured}`} alt="" />
               <button onClick={()=>handleDelete(credit._id)} className="text-center w-[40px] h-[30px] bg-red-500">X</button>
            </div>
                    )
                })
            }
         </div>
         <ToastContainer></ToastContainer>
        </>
    )
}

export default Credits