import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogSection() {
  const blogs = useSelector((state) => state.blogs.blogs);
  const blog = blogs.slice(0,3);
 console.log(blogs);
  return (
    <section className="xl:px-20 py-3 ">
      <h1 className=" text-yellow-400 text-3xl font-bold text-center">
        Blogs From Students
      </h1>
      <Link className="text-yellow-400 float-end underline ">Show All</Link>
      <div className="flex xl:ps-10 justify-between py-10">
        {blog ? blog.map((blog) =>{
            return(
                <Card
                className="max-w-sm dark  bg-[#1F2937]"
                imgAlt="Meaningful alt text for an image that is not purely decorative"

              >
                <img src={`http://localhost:5000/${blog.featured}`} className="h-[200px] w-[300px] object-cover " alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {
                    blog.title.length > 30 ? blog.title.slice(0,30) + "..." : blog.title
                  }
                </h5>
               <div dangerouslySetInnerHTML={{ __html: `${blog.description.slice(0,30) + '...'}`  }}>

               </div>
              </Card>
            )
        }) : (
          ""
        )}
      </div>
    </section>
  );
}

export default BlogSection;
