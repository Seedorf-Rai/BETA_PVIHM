import { useSelector } from "react-redux"
import Slider from "react-slick"



function CreditTransferSection(){

    const credits =  useSelector((state)=>state.credits.credits)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
      console.log(credits);
    return(
        <section className="xl:px-20 py-10" >
            <h1 className="text-yellow-400 text-3xl font-bold text-center ">Credit Transfer</h1>
            <Slider className="ps-14  my-10" {...settings}>
        {
            credits ?  credits.map((credit)=>{
                return (
                   <div className="w-[150px] px-4">
                     <img className="rounded" src={`http://localhost:5000/${credit.featured}`} alt="" srcset="" />
                   </div>
                )
               }):''
        }

      </Slider>
        </section>
    )
}

export default CreditTransferSection