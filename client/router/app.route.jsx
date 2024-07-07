import {
    createBrowserRouter,
  } from "react-router-dom";
import UserLayout from "../layouts/user";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import About from "../pages/about";
import Course from "../pages/courses";
import Blogs from "../pages/blogs";
import Contact from "../pages/contact";
import Home from "../pages";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Provider store={store}>
        <UserLayout></UserLayout>
      </Provider>,
      children : [
        {
         path: "/",
         element: <Home></Home>
        },
        {
          path: "about-us",
          element : <About></About>
        },
        {
          path : "courses",
          element : <Course></Course>
        },
        {
          path : "blogs",
          element : <Blogs></Blogs>
        },
        {
          path : "contact",
          element : <Contact></Contact>
        }
      ]
    }
  ]);

export default router