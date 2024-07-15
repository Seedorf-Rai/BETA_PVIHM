
"use client";

import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




export function NavBar() {
  const value = useSelector((state)=>state.setting.company)
  const logoPath =  value?.logo ;
  console.log(logoPath);
console.log(value);
  return (
    <Navbar  rounded className="bg-transparent mx-10 " >
      <Link to="/">
      <Navbar.Brand >
        <img src={`http://localhost:5000/${logoPath}`} className="mr-3 h-6 sm:h-16" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white f-p">PVIHM</span>
      </Navbar.Brand>
      </Link>
      <div className="flex md:order-2">
        <Link to={'/student'} ><Button className="f-p">Login as student</Button></Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse >
        <Link to="/"><Navbar.Link className="text-white f-p text-lg"  >
          Home
        </Navbar.Link></Link>
        <Link to="/about-us"><Navbar.Link className="f-p text-white text-lg ">About Us</Navbar.Link></Link>
        <Link to="/courses" >
        <Navbar.Link className="f-p text-white text-lg">Courses</Navbar.Link>
        </Link>
        <Link to="/blogs" >
        <Navbar.Link className="f-p text-white text-lg">Student Blogs</Navbar.Link>
        </Link>
       <Link to="/contact" >
       <Navbar.Link className="f-p text-white text-lg" >Contact</Navbar.Link>
       </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
