import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAffiliation } from "../../../src/slice/admin/affiliationSlice";
import { toast, ToastContainer } from "react-toastify";

function Affiliation() {
  const affs = useSelector((state) => state.affiliation.affiliations);
  const dispatch = useDispatch();

 async function handleDelete(id) {
    console.log(id);
    if (window.confirm("Are you sure you want to delete")) {
      const response = await dispatch(deleteAffiliation({ id: id }));
      if (deleteAffiliation.fulfilled.match(response)) {
        toast.success("Affiliation Deleted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      else {
        toast.error("Could not delete Affiliation");
      }
    }
  }
  return (
    <>
      <Link to={"/admin/aff/add"}>
        <button className="mt-5 p-3 rounded bg-cyan-600">
          Add Affiliation
        </button>
      </Link>
      {affs
        ? affs.map((aff) => {
            return (
              <div className="my-10  me-20 px-10 py-10 bg-[#1F2937]">
                <div className="flex gap-10">
                  <img
                    className="h-[250px] w-[300px] object-cover "
                    src={`http://localhost:5000/${aff?.image}`}
                    alt=""
                    srcset=""
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: aff?.description }}
                  ></div>
                </div>
                <div className="flex">
                  <Link to={`/admin/aff/edit/${aff?._id}`}>
                    <button className="p-3 bg-yellow-500 rounded mt-5 ">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(aff._id);
                    }}
                    className="p-3 bg-red-600 rounded mt-5 ms-10 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        : ""}
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Affiliation;
