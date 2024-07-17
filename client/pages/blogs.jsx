import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Blogs() {

    const blogs = useSelector((state)=>state.blogs.blogs)

  return (
    <>
      <h1 className="my-10 text-center text-3xl font-bold ">
        Blogs From <span className="text-[#E3A008]"> Our Students</span>
      </h1>
      <div className="grid grid-cols-3 xl:px-24 gap-10 py-10 ">
           {
            blogs ? blogs.map((blog)=>{
                return(
                    <Link to={`/blogs/${blog._id}`} >
                    <Card
                    className="max-w-sm dark  bg-[#1F2937]"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"

                  >
                    <img src={`http://localhost:5000/${blog.featured}`} className="h-[200px] w-[350px] object-cover " alt="" />
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {
                        blog.title.length > 30 ? blog.title.slice(0,30) + "..." : blog.title
                      }
                    </h5>
                   <div dangerouslySetInnerHTML={{ __html: `${blog.description.slice(0,30) + '...'}`  }}>

                   </div>
                  </Card>
                    </Link>
                )
            }) : ''
           }
         </div>
    </>
  );
}

export default Blogs;
