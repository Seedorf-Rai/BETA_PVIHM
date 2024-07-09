import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { postCarousel } from "../../src/slice/admin/carouselSlice"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddCarousel(){

const [carousel,setCarousel] = useState(null)
const [nextPage, setNextPage] = useState(false);


const dispatch = useDispatch()
async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData()
    if(carousel){
        formData.append('carousel',carousel)
    }
    else{
        toast.error('Unable to add carousel')
        return
    }
    const response = await dispatch(postCarousel({data: formData}))
    if(postCarousel.fulfilled.match(response)){
        toast.success('Carousel Added Sucessfully!', {
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
        toast.error('Failed to Add')
    }
}

if(nextPage){
    return <Navigate to={'/admin/carousel'} ></Navigate>
}

    return(
        <>
        <Link to={'/admin/carousel'} >
          <button>
            Go Back
          </button>
          </Link>
          <div className="mt-10">
          <input type="file" onChange={(e) => setCarousel(e.target.files[0])} name="carousel" id=""  />
          <button onClick={handleSubmit}>Submit Carousel</button>
          </div>
          <ToastContainer></ToastContainer>
        </>
    )
}
export default AddCarousel