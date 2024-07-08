import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"


function AdminSettingEdit(){


    const {id} = useParams();
    const [address,setAddress] = useState()
    const [telephone_number,setTelephoneNumber] = useState();
    const [mobile_number,setMobileNumber] = useState();
    const [email,setEmail] = useState();
    const [facebook,setFacebook] = useState();
    const [instagram,setInstagram] = useState();
    const [youtube,setYoutube] = useState();
    const [linkedin,setLinkedIn] = useState();
    const setting = useSelector((state)=>state.setting.company)
    useEffect(()=>{
        if(setting){
            setAddress(setting.address)
            setTelephoneNumber(setting.telephone_number)
            setMobileNumber(setting.mobile_number)
            setEmail(setting.email)
            setFacebook(setting.social_media.facebook)
            setInstagram(setting.social_media.instagram)
            setYoutube(setting.social_media.youtube)
            setLinkedIn(setting.social_media.linkedin)
          }
    },[])
    console.log(id)
    function handleSubmit(e){
        e.preventDefault();
        console.log("Hello");
    }
    return(
        <>
          <div className="flex">
            <label htmlFor="">Upload Logo</label>
            <input  type="file" name="logo" id="" />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Address</label>
                 <input onChange={(e)=>{setAddress(e.target.value) ; console.log(address); } } className="bg-transparent"  type="text" value={address} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Telephone Number</label>
                 <input onChange={(e)=>{setTelephoneNumber(e.target.value) ; console.log(telephone_number); } } className="bg-transparent"  type="text" value={telephone_number} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Mobile Number</label>
                 <input onChange={(e)=>{setMobileNumber(e.target.value) ; console.log(mobile_number); } } className="bg-transparent"  type="text" value={mobile_number} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Email</label>
                 <input onChange={(e)=>{setEmail(e.target.value) ; console.log(email); } } className="bg-transparent"  type="text" value={email} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Facebook Link</label>
                 <input onChange={(e)=>{setFacebook(e.target.value) ; console.log(facebook); } } className="bg-transparent"  type="text" value={facebook} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Instagram Link</label>
                 <input onChange={(e)=>{setInstagram(e.target.value) ; console.log(instagram); } } className="bg-transparent"  type="text" value={instagram} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Youtube Link</label>
                 <input onChange={(e)=>{setYoutube(e.target.value) ; console.log(youtube); } } className="bg-transparent"  type="text" value={youtube} />
          </div>
          <div className="flex mt-4">
                 <label htmlFor="">Lnkedin Link</label>
                 <input onChange={(e)=>{setLinkedIn(e.target.value) ; console.log(linkedin); } } className="bg-transparent"  type="text" value={linkedin} />
          </div>
          <button onClick={handleSubmit}>Submit Changes</button>
        </>
    )
}

export default AdminSettingEdit