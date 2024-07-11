import { Link } from "react-router-dom";

import { Table } from "flowbite-react";
import { useSelector } from "react-redux";

function StudentList(){

    const students = useSelector((state)=>state.student.students)
    students.forEach((student)=>{
        // student.password = 
    })
    return(
        <>
          <Link to={'/admin/student'} >
           <button class="p-3 rounded bg-cyan-600 " >
             Add Student
           </button>
          </Link>
          <div className="overflow-x-auto me-20 dark my-10 ">
      <Table hoverable >
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Student name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>

        </Table.Head>
        <Table.Body className="divide-y">
          {
            students ?
            students.map((student)=>{
                return(
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
             { student.username }
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {
                student.email
              }
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {
                student.password
              }
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <button className="underline" >
                View
              </button>
            </Table.Cell>
          </Table.Row>
                )
            }) : ''
          }
        </Table.Body>
      </Table>
    </div>
        </>
    )
}

export default StudentList;