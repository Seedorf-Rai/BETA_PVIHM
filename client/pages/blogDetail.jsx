import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function BlogDetailPage() {
  const { id } = useParams();
  console.log(id);
  const blogs = useSelector((state) => state.blogs.blogs);

  const blog = blogs.find((x) => x._id === id);
  console.log(blog);
  return (
    <>
      {blog ? (
        <div className="xl:px-20 py-10">
          <h1 className="text-center my-10 font-bold text-3xl">{blog.title}</h1>
          <p className="mb-2" ><span className="text-[#E3A008]" >Posted By :</span> {blog.creator_name} </p>
          <p className="mb-4 text-[#666666]">{blog.readTime}</p>
          <img className="w-full object-cover h-[500px]" src={`http://localhost:5000/${blog.featured}`} alt="" />
          <div className="mt-10" dangerouslySetInnerHTML={{ __html: `${blog.description}` }} ></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BlogDetailPage;
