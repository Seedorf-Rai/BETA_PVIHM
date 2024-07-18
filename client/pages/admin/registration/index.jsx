import { Table } from "flowbite-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"


export function Registration(){
  const forms = useSelector((state)=>state.forms.forms)
    return(
        <>
          <div className="overflow-x-auto me-20 dark my-10">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Student name</Table.HeadCell>
            <Table.HeadCell>Student Contact</Table.HeadCell>
            <Table.HeadCell>Interested Course</Table.HeadCell>
            <Table.HeadCell>Parents Number</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {forms ? forms.map((form) => (
              <Table.Row key={form?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <Link to={`/admin/form/edit/${form._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Info
                  </Link>
                  <button onClick={()=>{handleDelete(form._id)}} className="font-medium ms-3 text-red-500">
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {form.studentName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {form.studentNumber}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {form.studentCourse}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {form.parentNumber}
                </Table.Cell>
              </Table.Row>
            )) : ''}
          </Table.Body>
        </Table>
        <ToastContainer></ToastContainer>
      </div>
        </>
    )
}