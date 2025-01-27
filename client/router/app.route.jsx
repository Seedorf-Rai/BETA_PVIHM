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
import Affiliation from "../pages/admin/affiliations";
import AddAffiliation from "../pages/admin/affiliations/create";
import EditAffiliation from "../pages/admin/affiliations/edit";
import Credits from "../pages/admin/credits";
import AddCredits from "../pages/admin/credits/create";
import AllBlogs from "../pages/admin/blogs";
import AddBlog from "../pages/admin/blogs/create";
import EditBlog from "../pages/admin/blogs/edit";
import Login from "../pages/student/Login";
import StudentLayout from "../layouts/student";
import StudentHome from "../pages/student/Home";
import StudentAddBlog from "../pages/student/create";
import { studentStore } from "../src/app/studentStore";
import StudentEditBlog from "../pages/student/edit";
import BlogDetailPage from "../pages/blogDetail";
import { Registration } from "../pages/admin/registration";
import EditRegistration from "../pages/admin/registration/edit";

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
          path : "blogs/:id",
          element : <BlogDetailPage></BlogDetailPage>
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
        },
        {
          path : "/admin/aff",
          element : <Affiliation></Affiliation>
        },
        {
          path : "/admin/aff/add",
          element : <AddAffiliation></AddAffiliation>
        },
        {
          path : "/admin/aff/edit/:id",
          element : <EditAffiliation></EditAffiliation>
        },
        {
          path : "/admin/credits",
          element : <Credits></Credits>
        },
        {
          path : "/admin/credits/add",
          element : <AddCredits></AddCredits>
        },
        {
          path : "/admin/blogs",
          element : <AllBlogs></AllBlogs>
        },
        {
          path : "/admin/blogs/add",
          element : <AddBlog></AddBlog>
        },
        {
          path : "/admin/blogs/edit/:id",
          element : <EditBlog></EditBlog>
        },
        {
          path : '/admin/registration',
          element : <Registration></Registration>
        },
        {
          path : '/admin/registration/edit/:id',
          element : <EditRegistration></EditRegistration>
        }
      ]
    },

      {
        path : '/admin/login',
        element : <AdminLogin></AdminLogin>
      },
      {
        path : '/student/login',
        element : <Login></Login>
      },
      {
        path : '/student',
        element : <Provider store={studentStore} >
          <StudentLayout></StudentLayout>
        </Provider>,
        children : [
          {
            path : '/student',
            element : <StudentHome></StudentHome>
          },
          {
            path : '/student/blog/add',
            element : <StudentAddBlog></StudentAddBlog>
          },
          {
            path : '/student/blog/edit/:id',
            element : <StudentEditBlog></StudentEditBlog>
          }
        ]
      },

  ]);

export default router