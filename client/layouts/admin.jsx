import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../src/components/Admin/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSetting } from "../src/slice/admin/settingSlice";
import axiosApi from "../src/conf/axios";

function AdminLayout() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  async function checkLogin() {
    try {
      console.log(document.cookie);
      const response = await fetch("http://localhost:5000/admin",{
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

export default AdminLayout;
