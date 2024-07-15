import { useSelector } from "react-redux"


export default function Director(){
    const director = useSelector((state)=>state.director.director);
    return(
        <>
         {
        director ? <div className="container py-16 xl:px-40">
        <div className="flex justify-between gap-10">

          <div className="fb flex-1">
            <h1 className="f-p mb-6 text-yellow-400 text-3xl font-bold">
              Message From The Director
            </h1>
            <div dangerouslySetInnerHTML={{__html: `${director.message}` }} >

</div>
          </div>
          <img
            className="xl:w-[600px] flex-1 xl:h-[400px] object-cover rounded-md "
            src={`http://localhost:5000/${director?.image}`}
            alt=""
          />
        </div>
      </div>: ""
      }
        </>
    )
}