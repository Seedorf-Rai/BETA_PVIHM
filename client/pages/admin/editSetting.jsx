import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom"
import axiosApi from "../../src/conf/axios";
import { fetchSetting, patchSetting } from "../../src/slice/admin/settingSlice";


function AdminSettingEdit(){

    const [nextPage,setNextPage] = useState(false);
    const dispatch = useDispatch()
    const {id} = useParams();
    const [logo,setLogo] = useState(null);
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
    },[setting])
    console.log(id)
    useEffect(() => {
       dispatch(fetchSetting());
   }, [dispatch]);
  async   function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('address',address);
        formData.append('telephone_number',telephone_number);
        formData.append('mobile_number',mobile_number);
        formData.append('email',email);
       formData.append('facebook',facebook);
       formData.append('instagram',instagram);
       formData.append('youtube',youtube);
       formData.append('linkedin',linkedin);
        if (logo) {
              formData.append('logo', logo);
          }
          console.log(formData);
       const result = await  dispatch(patchSetting({id,data : formData}))
       if(patchSetting.fulfilled.match(result)){
              console.log("yes");
              setNextPage(true)
       }
    }
    if(nextPage){
       return <Navigate to={'/admin'}></Navigate>
    }
    return(
        <>
          <div className="flex">
            <label htmlFor="">Upload Logo</label>
            <input  type="file" onChange={(e)=>setLogo(e.target.files[0])} name="logo" id="" />
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
          <div className="flex mt-10">
          <button className="bg-green-500"onClick={handleSubmit}>Submit Changes</button>
          <button className="bg-red-600 ms-10" onClick={()=>{setNextPage(true)}} >Cancel</button>
          </div>
        </>
    )
}

export default AdminSettingEdit