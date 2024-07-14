
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export function SideBar() {

  const setting = useSelector((state)=>state.setting.company)
//   console.log(setting);
    return (
    <Sidebar className="h-[100vh] dark sidebar" style={{ backgroundColor : '#283046' }} aria-label="Default sidebar example">
      <div className="flex justify-center">
      {
        setting ? <img className="h-[80px] w-[80px] items-center " src={`http://localhost:5000/${setting.logo}`} alt="" /> : ''
      }
      </div>
      <Sidebar.Items >
        <Sidebar.ItemGroup>
          <Link to={'/admin'}>
          <Sidebar.Item  icon={HiChartPie}>
            Setting
          </Sidebar.Item>
          </Link>
          <Link to={'/admin/carousel'}>
          <Sidebar.Item icon={HiViewBoards}  >
             Carousel
          </Sidebar.Item>
          </Link>
          <Link to={`/admin/welcome`} >
          <Sidebar.Item  icon={HiTable}>
            Welcome Section
          </Sidebar.Item>
          </Link>
          <Link >
          <Link to={'/admin/ceoMessage'} >
          <Sidebar.Item  icon={HiInbox} >
            CEO Message
          </Sidebar.Item>
          </Link>
          <Link to={'/admin/director'} >
          <Sidebar.Item  icon={HiInbox} >
            Director Message
          </Sidebar.Item>
          </Link>
          </Link>
          <Link to={'/admin/student'} >
          <Sidebar.Item href="#" icon={HiUser}>
            Students
          </Sidebar.Item>
          </Link>
          <Link to={`/admin/courses`} >
          <Sidebar.Item  icon={HiTable}>
           Our Courses
          </Sidebar.Item>
          </Link>
          <Link to={'/admin/aff'} >
          <Sidebar.Item  icon={HiInbox} >
            Affiliations
          </Sidebar.Item>
          </Link>
          <Link to={'/admin/credits'}>
          <Sidebar.Item icon={HiViewBoards}  >
             Credit Transfers
          </Sidebar.Item>
          </Link>
          <Link to={`/admin/blogs`} >
          <Sidebar.Item  icon={HiTable}>
           Blogs
          </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
