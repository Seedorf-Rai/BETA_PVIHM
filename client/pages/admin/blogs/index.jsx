import { Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog } from "../../../src/slice/admin/blogSlice";

function AllBlogs() {
  const blogs = useSelector((state)=>state.blogs.blogs)
  const dispatch = useDispatch();
  function handleDelete(id){
    if(window.confirm('Are you sure you want to delete this blog')){
      dispatch(deleteBlog({id:id}));
    }
  }
  return (
    <>
      <Link to={'/admin/blogs/add'} >
      <button className="mt-5 p-3 bg-cyan-600 rounded">Add Blogs</button>
      </Link>
      <div className="mt-5 py-10">
        <div className="grid grid-cols-2 gap-10">
          {
            blogs ?
            blogs.map((blog)=>{
              return(
                <div>
            <Card
              className="max-w-sm  bg-[#283046]"
              imgAlt=""

            >
              <img className="w-[350px] h-[250px] object-cover " src={`http://localhost:5000/${blog.featured}`} alt="" />
              <h5 className=" dark text-2xl font-bold tracking-tight ">
                {blog.title}
              </h5>
              <h5 className=" text-green-500 text-xl font-bold tracking-tight ">
                {blog.creator_name}
              </h5>
              <div className="flex justify-between ">
                <Link to={`/admin/blogs/edit/${blog._id}`} >
                <button className="p-2 rounded bg-yellow-600">Edit</button>
                </Link>
                <button onClick={()=>{handleDelete(blog._id)}} className="p-2 rounded bg-red-600">Delete</button>
              </div>
            </Card>
          </div>
              )
            })
          : ''
          }

        </div>
      </div>
    </>
  );
}

export default AllBlogs;
