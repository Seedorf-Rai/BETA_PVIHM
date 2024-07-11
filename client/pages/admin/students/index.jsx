import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteStudent } from "../../../src/slice/admin/studentSlice";

function StudentList() {
  const students = useSelector((state) => state.student.students);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const dispatch = useDispatch();

  const togglePasswordVisibility = (studentId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };
 const handleDelete = (id) => {
  if(window.confirm('Are you sure you want to delete')){
    dispatch(deleteStudent({id:id}))
  }
 }
  return (
    <>
      <Link to={'/admin/student/add'}>
        <button className="p-3 rounded mt-5 bg-cyan-600">
          Add Student
        </button>
      </Link>
      <div className="overflow-x-auto me-20 dark my-10">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Student name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Password</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {students ? students.map((student) => (
              <Table.Row key={student._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <Link to={`/admin/student/edit/${student._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </Link>
                  <button onClick={()=>{handleDelete(student._id)}} className="font-medium ms-3 text-red-500">
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {student.username}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {student.email}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <input
                    type={passwordVisibility[student._id] ? "text" : "password"}
                    className="bg-transparent border-none"
                    disabled
                    value={student.password}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <button className="underline" onClick={() => togglePasswordVisibility(student._id)}>
                    {passwordVisibility[student._id] ? "Hide" : "View"}
                  </button>
                </Table.Cell>
              </Table.Row>
            )) : ''}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default StudentList;
