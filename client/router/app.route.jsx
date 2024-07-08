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
import CourseDetail from "../pages/course-detail";
import AdminLayout from "../layouts/admin";
import CarouselSection from "../pages/admin/carousel";
import {adminStore} from "../src/app/adminStore";
import AdminLogin from "../pages/admin/Login";
import AdminSetting from "../pages/admin/setting";
import AdminSettingEdit from "../pages/admin/editSetting";

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
        },
        {
          path : "course/:id",
          element : <CourseDetail></CourseDetail>
        }
      ]
    },
    {
      path : "/admin",
      element : <Provider store={adminStore}>
         <AdminLayout></AdminLayout>
      </Provider>,
      children : [
        {
          path : "/admin",
          element : <AdminSetting></AdminSetting>
        },
         {
          path : "/admin/edit/:id",
          element : <AdminSettingEdit></AdminSettingEdit>
         },
        {
          path : "/admin/carousel",
          element : <CarouselSection></CarouselSection>
        }
      ]
    },

      {
        path : '/admin/login',
        element : <AdminLogin></AdminLogin>
      },

  ]);

export default router