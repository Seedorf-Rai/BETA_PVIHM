import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBar } from './components/global/Navbar'
import { store } from './app/store'
import { Provider, useDispatch } from 'react-redux'
import { fetchSetting } from './slice/settingSlice'



function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(fetchSetting());
  },[])
  return (
    <>
     <NavBar></NavBar>
    </>
  )
}

export default App
