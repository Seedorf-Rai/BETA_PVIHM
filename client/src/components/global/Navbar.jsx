
"use client";

import { Button, Navbar } from "flowbite-react";



export function NavBar() {
  return (
    <Navbar fluid rounded className="bg-transparent" >
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="https://pvihm.info/images/pvihmlogo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
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
        <Navbar.Link className="f-p text-white text-lg " href="#">About</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg" href="#">Services</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg" href="#">Pricing</Navbar.Link>
        <Navbar.Link className="f-p text-white text-lg"  href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
