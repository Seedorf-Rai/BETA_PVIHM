import { useSelector } from "react-redux";

function Welcome() {
    const welcome = useSelector((state)=>state.welcome.welcome)
    console.log(welcome);
  return (
    <>
      {
        welcome ? <div className="container py-16 xl:px-40">
        <div className="flex justify-between gap-10">
          <img
            className="xl:w-[600px] xl:h-[400px] object-cover rounded-md "
            src={`http://localhost:5000/${welcome?.image}`}
            alt=""
          />
          <div className="fb">
            <h1 className="f-p mb-6 text-yellow-400 text-3xl font-bold">
              Welcome To PVIHM FAMILY
            </h1>
            <div dangerouslySetInnerHTML={{__html: `${welcome.description}` }} >

            </div>
          </div>
        </div>
      </div>: ""
      }
    </>
  );
}
export default Welcome;
