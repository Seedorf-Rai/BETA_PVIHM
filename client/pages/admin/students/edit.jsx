import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { patchStudent } from "../../../src/slice/admin/studentSlice";

function EditStudent(){
    const {id} = useParams();
    const [nextPage,setNextPage] = useState(false);
    const dispatch = useDispatch();
 const students = useSelector((state)=>state.student.students);
 const errorMessage = useSelector((state)=>state.student.errorMessage);
 const student = students.find(student => student._id === id);
 console.log(student);

 const [pw, setPw] = useState(false);
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");

 useEffect(() => {
   if (student) {
     setUsername(student.username);
     setPassword(student.password);
     setEmail(student.email);
   }
 }, [student]);

 async function handleEdit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('username',username);
    formData.append('email',email);
    formData.append('password',password);
    const response = await dispatch(patchStudent({id:id,data:formData}))
    if(patchStudent.fulfilled.match(response)){
        toast.success('Student Updated Successfully!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            setNextPage(true);
          }, 2000);
    }
    else{
        toast.error(errorMessage || 'Could not add student', {
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

 if(nextPage){
    return <Navigate to={'/admin/student'} ></Navigate>
 }

 return(
        <>
         <Link to={`/admin/student`} >
         <button className="p-3 rounded bg-cyan-600 mt-5">
            Go Back
          </button>
         </Link>
         <div className="mt-10 w-1/2">
          <div className="flex gap-3 flex-col">
            <label htmlFor="">Username:</label>
            <input
              className="bg-transparent rounded-md" value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Student username"
            />
          </div>
          <div className="flex gap-3 my-6 flex-col">
            <label htmlFor="">Email:</label>
            <input
              className="bg-transparent rounded-md"
              onChange={(e) => setEmail(e.target.value)}
              type="text" value={email}
              placeholder="Enter Student email"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="">Password:</label>
            <input
              className="bg-transparent rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              type={!pw ? "password" : "text"} value={password}
              placeholder="Enter Student password"
            />
            <button onClick={() => setPw(!pw)}>
              {pw ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <button onClick={handleEdit} className="p-3 bg-green-500 mt-5 rounded">Update Student</button>
        </div>
      <ToastContainer></ToastContainer>
        </>
    )
}
export default EditStudent