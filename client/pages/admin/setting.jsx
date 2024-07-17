import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


function AdminSetting(){

 const setting = useSelector((state)=>state.setting.company)

    return(
        <>
         {setting ?
         <div className="my-10 me-20 py-10 bg-[#1F2937]">
         <div className="flex">
           <img className="h-[60px]" src={`http://localhost:5000/${setting.logo}`} alt="" />
            <h2>Logo</h2>
         </div>
         <div className="flex">
            <h2>
                Address :
            </h2>
            <h2>
                {setting.address}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Telephone Number :
            </h2>
            <h2>
                {setting.telephone_number}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Mobile Number :
            </h2>
            <h2>
                {setting.mobile_number}
            </h2>
         </div>
         <div className="flex">
            <h2>
               Email :
            </h2>
            <h2>
                {setting.email}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Facebook Profile Link :
            </h2>
            <h2>
                {setting.social_media.facebook}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Instagram Page Link :
            </h2>
            <h2>
                {setting.social_media.instagram}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Youtube Channel Link :
            </h2>
            <h2>
                {setting.social_media.youtube}
            </h2>
         </div>
         <div className="flex">
            <h2>
                Linkedin Page Link :
            </h2>
            <h2>
                {setting.social_media.linkedin}
            </h2>
         </div>
         <Link to={`/admin/edit/${setting._id}`}>
         <button className="mt-5 p-3 bg-cyan-600 rounded">Edit</button>
         </Link>
       </div>
       :
       ''
        }
        </>
    )
}
export default AdminSetting