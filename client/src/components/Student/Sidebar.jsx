
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiPlus, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";



export function StudentSideBar() {

//   const setting = useSelector((state)=>state.setting.company)
//   const [nextPage,setNextPage] = useState(false)

// async function handleLogout(){
//   try{
//     const response = await axiosApi.post('/admin/logout', {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       withCredentials: true
//     });
//     console.log(response);
//     setNextPage(true)
//   }
//   catch(err){
//   console.log(err);
//   }
// }

// if(nextPage){
//   return <Navigate to={'/'} ></Navigate>
// }



//   console.log(setting);

const setting = useSelector((state)=>state.setting.company)

    return (
    <Sidebar className="h-[100vh] dark sidebar" style={{ backgroundColor : '#283046' }} aria-label="Default sidebar example">
      <div className="flex justify-center">
      {
        setting ? <img className="h-[80px] w-[80px] items-center " src={`http://localhost:5000/${setting.logo}`} alt="" /> : ''
      }
      </div>
      <Sidebar.Items >
        <Sidebar.ItemGroup>

          <Link to={'/student'} >
          <Sidebar.Item href="#" icon={HiTable}>
            My Blogs
          </Sidebar.Item>
          </Link>

          <Link to={'/student/blog/add'}>
          <Sidebar.Item icon={HiPlus}  >
             Add New Blogs
          </Sidebar.Item>
          </Link>



          <Sidebar.Item className="absolute bottom-10" href="#" icon={HiArrowSmRight}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
