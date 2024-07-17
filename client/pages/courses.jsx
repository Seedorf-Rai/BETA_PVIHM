import { useSelector } from "react-redux"
import { CourseCard } from "../src/components/Cards/Course"


function Course(){
    const courses = useSelector((state)=>state.courses.courses)
    return(
        <>
         <h1 className="my-10 text-center text-3xl font-bold ">Our <span className="text-[#E3A008]" >Courses</span></h1>

         <div className="grid grid-cols-3 xl:px-24 gap-10 py-10 ">
           {
            courses ? courses.map((course)=>{
                return(
                    <CourseCard key={course.id} id={course._id} title={course.title} image={course.featured}  />
                )
            }) : ''
           }
         </div>

        </>
    )
}

export default Course