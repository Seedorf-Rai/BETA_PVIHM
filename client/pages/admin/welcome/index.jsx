import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


function WelcomeSection(){
  const welcome = useSelector((state)=>state.welcome.welcome)
  console.log(typeof welcome , welcome);
    return(
        <>
         {
            welcome ?  <div className="my-10  me-20 px-10 py-10 bg-[#1F2937]">
            <div className="flex gap-10">
                <img className="h-[250px] w-[300px] object-cover " src={`http://localhost:5000/${welcome[0].image}`} alt="" srcset="" />
                <p>
                    {
                        welcome[0].description
                    }
                </p>
            </div>
             <Link to={``}>
             <button>Edit</button>
             </Link>
           </div> : ''
         }
        </>
    )
}

export default WelcomeSection