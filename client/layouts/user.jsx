import { Provider, useDispatch } from "react-redux"
import { NavBar } from "../src/components/global/Navbar"
import { store } from "../src/app/store"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { fetchSetting } from "../src/slice/settingSlice"
import { fetchCarousel } from "../src/slice/carouselSlice"


function UserLayout(){
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(fetchSetting());
    dispatch(fetchCarousel());
    },[])
    return(
        <>

         <NavBar></NavBar>
         <Outlet></Outlet>

        </>
    )
}
export default UserLayout