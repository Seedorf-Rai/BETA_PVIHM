import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteCarousel } from "../../src/slice/admin/carouselSlice"


export default function CarouselSection(){

    const carousels = useSelector((state)=>state.carousel.carousels)
    const dispatch = useDispatch()
    function handleDelete(id){
        if(window.confirm('Are you sure you want to delete')){
            dispatch(deleteCarousel({id:id}))
        }
    }
    return(
        <>
        <Link to={'/admin/carousel/add'}>
        <button className="py-4 px-4 rounded bg-green-500">Add New Carousel</button>
        </Link>
         <h1>All Carousels</h1>
         <div className="flex flex-col gap-10">
            {
                carousels.map((carousel,key)=>{
                    return(
                        <div key={carousel._id} className="flex justify-between w-[600px] rounded-lg py-10 px-4 bg-[#283046]">
               <img className="w-[200px] h-[150px] object-cover " src={`http://localhost:5000/${carousel.image}`} alt="" />
               <button onClick={()=>handleDelete(carousel._id)} className="text-center w-[40px] h-[30px] bg-red-500">X</button>
            </div>
                    )
                })
            }
         </div>
        </>
    )
}