import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { postStudent } from "../../../src/slice/admin/studentSlice";
import { toast, ToastContainer } from "react-toastify";

function AddStudent() {
  const [pw, setPw] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isError, errorMessage } = useSelector((state) => state.student);
  async function handleRegister() {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    console.log('Form Data:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await dispatch(postStudent({ data: formData }));
      if (postStudent.fulfilled.match(response)) {
        toast.success('Student Added Successfully!', {
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
      } else {
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
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  }

  if (nextPage) {
    return <Navigate to={`/admin/student`} />;
  }

  return (
    <>
      <div className="mt-5">
        <Link to={'/admin/student'}>
          <button className="p-3 bg-cyan-600 rounded">Go Back</button>
        </Link>
        <div className="mt-10 w-1/2">
          <div className="flex gap-3 flex-col">
            <label htmlFor="">Username:</label>
            <input
              className="bg-transparent rounded-md"
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
              type="text"
              placeholder="Enter Student email"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="">Password:</label>
            <input
              className="bg-transparent rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              type={!pw ? "password" : "text"}
              placeholder="Enter Student password"
            />
            <button onClick={() => setPw(!pw)}>
              {pw ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <button onClick={handleRegister} className="p-3 bg-green-500 mt-5 rounded">Register Student</button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default AddStudent;
