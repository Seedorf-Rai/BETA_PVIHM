import { Provider, useDispatch } from "react-redux"
import { NavBar } from "../src/components/global/Navbar"
import { store } from "../src/app/store"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { fetchSetting } from "../src/slice/settingSlice"
import { fetchCarousel } from "../src/slice/carouselSlice"
import { fetchWelcome } from "../src/slice/welcomeSlice"
import { fetchCourses } from "../src/slice/courseSlice"
import { fetchCEOMsg } from "../src/slice/ceoMsgSlice"
import { fetchDirector } from "../src/slice/directorSlice"
import { fetchAffiliation } from "../src/slice/affiliationSlice"
import { fetchBlogs } from "../src/slice/blogSlice"


function UserLayout(){
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchSetting());
    dispatch(fetchCarousel());
    dispatch(fetchWelcome());
    dispatch(fetchCourses());
    dispatch(fetchCEOMsg());
    dispatch(fetchDirector());
    dispatch(fetchAffiliation())
    dispatch(fetchBlogs());

    },[])
    return(
        <>

         <NavBar></NavBar>
         <Outlet></Outlet>

        </>
    )
}
export default UserLayout