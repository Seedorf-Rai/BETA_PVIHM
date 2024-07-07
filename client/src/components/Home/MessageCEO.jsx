import { useSelector } from "react-redux"


export default function MessageCEO(){
    const ceo = useSelector((state)=>state.ceoMsg.msg);
    return(
        <>
         {
        ceo ? <div className="container py-16 xl:px-40">
        <div className="flex justify-between gap-10">
          <img
            className="xl:w-[600px] xl:h-[400px] object-cover rounded-md "
            src={`http://localhost:5000/${ceo?.image}`}
            alt=""
          />
          <div className="fb">
            <h1 className="f-p mb-6 text-yellow-400 text-3xl font-bold">
              Message From The CEO
            </h1>
            <p className="">
              {
                 ceo.message
              }
            </p>
          </div>
        </div>
      </div>: ""
      }
        </>
    )
}