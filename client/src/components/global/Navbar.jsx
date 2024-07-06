
"use client";

import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";




export function NavBar() {
  const value = useSelector((state)=>state.setting.company)
  const logoPath =  value?.logo ;
  console.log(logoPath);
console.log(value);
  return (
    <Navbar fluid rounded className="bg-transparent py-0 " >
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={`http://localhost:5000/${logoPath}`} className="mr-3 h-6 sm:h-16" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white f-p">PVIHM</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="f-p">Login as student</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse >
        <Navbar.Link className="text-white f-p text-lg" href="#" >
          Home
        </Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg " href="#">About Us</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg" href="#">Courses</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg" href="#">Student Blogs</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg"  href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
