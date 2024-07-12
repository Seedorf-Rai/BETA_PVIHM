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
import AddCarousel from "../pages/admin/addCarousel";
import WelcomeSection from "../pages/admin/welcome";
import EditWelcome from "../pages/admin/welcome/edit";
import CeoMsg from "../pages/admin/ceo";
import EditCeoMsg from "../pages/admin/ceo/edit";
import Director from "../pages/admin/director";
import EditDirector from "../pages/admin/director/edit";
import StudentList from "../pages/admin/students";
import EditStudent from "../pages/admin/students/edit";
import AddStudent from "../pages/admin/students/create";
import Courses from "../pages/admin/courses";
import AddCourse from "../pages/admin/courses/create";
import EditCourse from "../pages/admin/courses/edit";

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
        },
        {
          path : "/admin/carousel/add",
          element : <AddCarousel></AddCarousel>
        },
        {
          path : "/admin/welcome",
          element : <WelcomeSection></WelcomeSection>
        },
        {
          path : "/admin/welcome/edit/:id",
          element : <EditWelcome></EditWelcome>
        },
        {
          path : "/admin/ceoMessage",
          element : <CeoMsg></CeoMsg>
        },
        {
          path : "/admin/ceoMessage/edit/:id",
          element : <EditCeoMsg></EditCeoMsg>
        },
        {
          path : "/admin/director",
          element : <Director></Director>
        },
        {
          path : "/admin/director/edit/:id",
          element : <EditDirector></EditDirector>
        },
        {
          path : "/admin/student",
          element : <StudentList></StudentList>
        },
        {
          path : "/admin/student/edit/:id",
          element : <EditStudent></EditStudent>
        },
        {
          path : "/admin/student/add",
          element : <AddStudent></AddStudent>
        },
        {
          path : "/admin/courses",
          element : <Courses></Courses>
        },
        {
          path : "/admin/courses/add",
          element : <AddCourse></AddCourse>
        },
        {
          path : "/admin/courses/edit/:id",
          element : <EditCourse></EditCourse>
        }
      ]
    },

      {
        path : '/admin/login',
        element : <AdminLogin></AdminLogin>
      },

  ]);

export default router