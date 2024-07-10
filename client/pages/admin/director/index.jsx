import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Director() {

    const msg = useSelector((state)=>state.director.director)
  return (
    <>
      {
        msg ?
        <div className="my-10  me-20 px-10 py-10 bg-[#1F2937]">
        <div className="flex gap-10">
          <img
            className="h-[250px] w-[300px] object-cover "
            src={`http://localhost:5000/${msg?.image}`}
            alt=""
            srcset=""
          />
          <div dangerouslySetInnerHTML={{ __html: msg?.message }}></div>
        </div>
        <Link to={`/admin/director/edit/${msg?._id}`}>
          <button className="p-2 mt-6 bg-yellow-500" >Edit</button>
        </Link>
      </div>
      : ''
      }
    </>
  );
}

export default Director;
