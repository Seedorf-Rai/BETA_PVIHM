import { Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../../src/slice/admin/courseSlice";
import { Link } from "react-router-dom";

function Courses() {
  const courses = useSelector((state)=>state.courses.courses)
  const dispatch = useDispatch();
  function handleDelete(id){
    if(window.confirm('Are you sure you want to delete this course')){
      dispatch(deleteCourse({id:id}));
    }
  }
  return (
    <>
      <Link to={'/admin/courses/add'} >
      <button className="mt-5 p-3 bg-cyan-600 rounded">Add Courses</button>
      </Link>
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-10">
          {
            courses ?
            courses.map((course)=>{
              return(
                <div>
            <Card
              className="max-w-sm  bg-[#283046]"
              imgAlt=""

            >
              <img className="w-[350px] h-[250px] object-cover " src={`http://localhost:5000/${course.featured}`} alt="" />
              <h5 className=" dark text-2xl font-bold tracking-tight ">
                {course.title}
              </h5>
              <div className="flex justify-between ">
                <Link to={`/admin/courses/edit/${course._id}`} >
                <button className="p-2 rounded bg-yellow-600">Edit</button>
                </Link>
                <button onClick={()=>{handleDelete(course._id)}} className="p-2 rounded bg-red-600">Delete</button>
              </div>
            </Card>
          </div>
              )
            })
          : ''
          }

        </div>
      </div>
    </>
  );
}

export default Courses;
