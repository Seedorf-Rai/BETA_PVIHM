import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { patchCourse, postCourse } from "../../../src/slice/admin/courseSlice";
import { toast, ToastContainer } from "react-toastify";


function EditCourse(){

    const {id} = useParams()
    const dispatch = useDispatch();

    const courses = useSelector((state)=>state.courses.courses)
    const course = courses.find((course)=>course._id === id)

    const [nextPage,setNextPage] = useState(false);
    const [title,setTitle] = useState('')
    const [featured,setFeatured] = useState(null)
    const [duration,setDuration] = useState('')
    const [description,setDescription] = useState('')
    const [whoTake,setWhoTake] = useState('')
    const [pack,setPack] = useState('')
    const [benefit,setbenefit] = useState('')
    const errorMessage = useSelector((state)=>state.courses.errorMessage)

   async  function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('title',title);
        if(featured){
            formData.append('featured',featured);
        }
        formData.append('duration',duration);
        formData.append('description',description);
        formData.append('who_must_take',whoTake);
        formData.append('package',pack);
        formData.append('benefits_of_learning',benefit);

        const response = await dispatch(patchCourse({id:id,data:formData}))
       if(patchCourse.fulfilled.match(response)){
        toast.success('Course Updated Sucessfully!', {
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
        toast.error(errorMessage || 'Could not Update the Course', {
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
      setTitle(course.title)
      setDuration(course.duration)
      setDescription(course.description)
      setWhoTake(course.who_must_take)
      setPack(course.package)
      setbenefit(course.benefits_of_learning)
     },[course])
     if(nextPage){
        return <Navigate to='/admin/courses' ></Navigate>
     }

    return(
        <>
         <Link to={'/admin/courses'}>
           <button className="p-3 bg-cyan-600 mt-5 rounded " >
            Go Back
           </button>
         </Link>
         <div className="my-10 me-20  ">
            <div className="flex  flex-col ">
                <label htmlFor="">Enter Course</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-transparent rounded mt-4" type="text" placeholder="eg: ADHM" />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Add Featured Photo</label>
                <input onChange={(e)=>setFeatured(e.target.files[0])} className="bg-transparent rounded mt-4" type="file" placeholder="" />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Enter Course Duration</label>
                <input value={duration} onChange={(e)=>setDuration(e.target.value)} className="bg-transparent rounded mt-4" type="text" placeholder="eg: 14 Months" />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Enter Course Description</label>
                <ReactQuill className="mt-4" theme="snow" value={description} onChange={setDescription} />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Who must Take the Course</label>
                <input value={whoTake} onChange={(e)=>setWhoTake(e.target.value)} className="bg-transparent rounded mt-4" type="text" placeholder="In the Format : Students who have passed SEE, Students who have passes +2, Students who are willing to internship abroad" />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Course Package: </label>
                <input value={pack} onChange={(e)=>setPack(e.target.value)} className="bg-transparent rounded mt-4" type="text" placeholder="In the Format : High Salary, Learn new things, Internship abroad" />
            </div>
            <div className="flex mt-4 flex-col ">
                <label htmlFor="">Course Benefits and Outcomes: </label>
                <input value={benefit} onChange={(e)=>setbenefit(e.target.value)} className="bg-transparent rounded mt-4" type="text" placeholder="In the Format : High Salary, Learn new things, Internship abroad" />
            </div>
            <button onClick={handleSubmit} className="p-3 bg-green-500 rounded mt-8 " >Save Course</button>
         </div>
         <ToastContainer></ToastContainer>
        </>
    )
}
export default EditCourse