import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../src/components/Admin/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSetting } from "../src/slice/admin/settingSlice";
import { fetchCarousel } from "../src/slice/admin/carouselSlice";
import "react-toastify/dist/ReactToastify.css";
import { fetchWelcome } from "../src/slice/admin/welcomeSlice";
import { fetchCeoMsg } from "../src/slice/admin/ceoSlice";
import { fetchDirector } from "../src/slice/admin/directorSlice";
import { fetchStudent } from "../src/slice/admin/studentSlice";
import { fetchCourses } from "../src/slice/admin/courseSlice";
import { fetchAffiliation } from "../src/slice/admin/affiliationSlice";
import { fetchCredits } from "../src/slice/admin/creditSlice";
import { fetchBlogs } from "../src/slice/admin/blogSlice";

function StudentLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  async function checkLogin() {
    try {
      const response = await fetch("http://localhost:5000/student",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`
          }
      })
      console.log(response);
      if (response.status !== 200) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    // } catch (err) {
    //   setIsAuthenticated(false);
    // }
    }
    catch(err){
      setIsAuthenticated(false);
    }
  }


  useEffect(() => {
    checkLogin();
    dispatch(fetchSetting());
    dispatch(fetchCarousel());
    dispatch(fetchWelcome());
    dispatch(fetchCeoMsg());
    dispatch(fetchDirector());
    dispatch(fetchStudent());
    dispatch(fetchCourses());
    dispatch(fetchAffiliation());
    dispatch(fetchCredits());
    dispatch(fetchBlogs())
  }, [dispatch]);
  if (isAuthenticated === null) {
    // Optionally show a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  return (
    <>
      <div className="grid h-[100vh] overflow-hiddenhidden grid-cols-4 gap-10">
        <div className="col-span-1">
          <SideBar></SideBar>
        </div>
        <div className="col-span-3 admin-content">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
