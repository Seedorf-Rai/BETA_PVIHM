import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";


function Footer(){

    const setting = useSelector((state)=>state.setting.company)


    return(
        <footer className="py-12 px-14">
            <div className="grid grid-cols-4 ">
               <div className="col-span-1">
                {
                    setting ?
                    <img className="w-[80px] " src={`http://localhost:5000/${setting.logo}`} alt="" /> : ''
                }
                <p className="mt-4">
                PVIHM was established iin 2018 with a mission to deliver internationally recognized qualifications. PVIHM offers a range of qualifications in collaboration with LCCI Global Qualification approved by Scottish Qualification Authority (SQA) and benchedmarked at European Qualification Framework. LCCI GQ exist to make an impact in the education sytem in Nepal, ambition to deliever industry-relevant education and make skillful education accessible and beneficial to all those passionate.
                </p>
               </div>
               <div className="col-span-1 ms-16">
                <h1 className="mb-8 font-bold text-3xl ">Links</h1>
                <div className="flex flex-col">
                <Link to={'/'} className="text-[#E3A008] mb-2" >
                Home
                </Link>
                <Link to={'/about-us'} className="text-[#E3A008] mb-2" >
                About Us
                </Link>
                <Link to={'/courses'} className="text-[#E3A008] mb-2" >
                Check Courses
                </Link>
                <Link to={'/blogs'} className="text-[#E3A008] mb-2" >
                Student Blogs
                </Link>
                <Link to={'/'} className="text-[#E3A008] mb-2" >
                CV Generator
                </Link>
                <Link to={'/contact'} className="text-[#E3A008] mb-2" >
                Contact
                </Link>
                </div>
               </div>
               <div className="col-span-1">
               <h1 className="mb-8 font-bold text-3xl">Know More</h1>
                <div className="flex flex-col">
                <Link to={'/courses'} className="text-[#E3A008] mb-2" >
                What After SEE ?
                </Link>
                <Link to={'/courses'} className="text-[#E3A008] mb-2" >
                What After +2 ?
                </Link>
                </div>
               </div>
               {
                setting ? <div className="col-span-1">
                <h1 className="mb-8 font-bold text-3xl">Contact Info</h1>
                <p className="mb-2"><span className="text-[#E3A008] ">Address : </span>{setting.address}</p>
                <p className="mb-2"><span className="text-[#E3A008] ">Phone Number : </span>{setting.mobile_number}</p>
                <p className="mb-2"><span className="text-[#E3A008] ">Email : </span> {setting.email}</p>
                <div>
                  <h1 className="mb-8 font-bold text-3xl">Social Media: </h1>
                  <div className="flex w-1/2 justify-between">
                  <a target="_blank" href={setting.social_media.facebook}>
                  <FaFacebook className="text-[#0867FE] text-2xl " />
                  </a>
                   <a  target="_blank" href={setting.social_media.instagram}>
                  <FaInstagram className="text-[#FF5125] text-2xl " />
                   </a>
                   <a target="_blank" href={setting.social_media.youtube}>
                   <FaYoutube className="text-[#FF0101] text-2xl" />
                   </a>
                   <a target="_blank" href={setting.social_media.linkedin}>
                   <FaLinkedin className="text-[#0B66C3] text-2xl" />
                   </a>
                  </div>
                </div>

               </div>


               :
               ''
               }
            </div>
            <div class="w-full mt-6 bg-[#666666] h-[0.5px] "></div>
            <p className="text-center mt-8" >
            2024 Prime Vision International Hospitality Management College | All Rights Reserved.
            </p>
        </footer>
    )
}
export default Footer