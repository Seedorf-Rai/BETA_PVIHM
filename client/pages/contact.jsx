import { useState } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify";


function Contact(){
    const setting = useSelector((state)=>state.setting.company)
    const courses = useSelector((state)=>state.courses.courses)

    const [name,setName] = useState(null)
    const [age,setAge] = useState(null)
    const [number,setNumber] = useState(null);
    const [from,setFrom] = useState(null);
    const [course,setCourse] = useState(null);
    const [parentName,setParentName] = useState(null);
    const [parentNumber,setParentNumber] = useState(null);
    const [addresses,setAddresses] = useState(null);

    function handleSubmit(e){
        e.preventDefault();
        if(!name || !age || !number || !from || !course || !parentName || !parentNumber || !addresses){
           toast.error('Please fill the complete form')
           return
        }
        else{
          const formData = new FormData();
          formData.append('name',name);
          formData.append('age',age);
          formData.append('number',number);
          formData.append('from',from);
          formData.append('course',course);
          formData.append('parentName',parentName);
          formData.append('parentNumber',parentNumber);
          formData.append('addresses',addresses);
        }
    }

    return(
        <>
         <div className="grid py-10 mb-8 xl:px-20 grid-cols-2">
           <div>
             <h1 className="text-3xl font-bold text-center ">Contact Information</h1>
             {
                setting ?  <div className="mt-10">
                   <p className="text-xl mb-4"><span className="text-[#E3A008] me-5 " >Address :</span> {setting.address} </p>
                   <p className="text-xl mb-4"><span className="text-[#E3A008] me-5 " >Contact Number :</span> {setting.mobile_number} </p>
                   <p className="text-xl mb-4"><span className="text-[#E3A008] me-5 " >Email :</span> {setting.email} </p>
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
                :
                ''
             }
           </div>
           <div>
              <h1 className="text-3xl font-bold text-center">Online Form</h1>
              <form action="">
              <div className="py-10">
               <div className="flex justify-between">
               <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Student Name: </label>
                <input required type="text" onChange={(e)=>setName(e.target.value)} className="bg-transparent" placeholder="Enter Name" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Student's Age: </label>
                <input required type="number" onChange={(e)=>setAge(e.target.value)} min={0} className="bg-transparent" placeholder="Enter Age" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Student's Contact Number: </label>
                <input required  type="text" onChange={(e)=>setNumber(e.target.value)} className="bg-transparent" placeholder="Enter Name" />
                </div>
               </div>
               <div className="grid gap-3 grid-cols-2 mt-5">
               <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">SEE From: </label>
                <input required type="text" onChange={(e)=>setFrom(e.target.value)} className="bg-transparent" placeholder="Enter School Name" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Interested Course: </label>
                    <select className="bg-transparent" onChange={(e)=>setCourse(e.target.value)} name="" id="">
                        {
                            courses ?
                            courses.map((course)=>{
                                return(
                                    <option className="bg-[#0F1023]" value={course.title}>{course.title}</option>
                                )
                            })
                            :
                            ''
                        }
                    </select>
                </div>

               </div>
               <div className="flex justify-between mt-5">
               <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Student Address: </label>
                <input required type="text" onChange={(e)=>setAddresses(e.target.value)} className="bg-transparent" placeholder="Enter Name" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Parent's Name: </label>
                <input required type="text" onChange={(e)=>setParentName(e.target.value)}  className="bg-transparent" placeholder="Enter Age" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3" htmlFor="">Parent's Contact Number: </label>
                <input required  type="text" onChange={(e)=>setParentNumber(e.target.value)} className="bg-transparent" placeholder="Enter Name" />
                </div>
               </div>
              </div>
              <button type="submit" onClick={handleSubmit} className="p-3 rounded bg-green-600">Submit Form</button>
              </form>
           </div>
         </div>
         <div className="xl:px-20">
            <h1 className="text-3xl font-bold text-center mb-10" >Our Location</h1>
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.7427761772396!2d87.27843377543616!3d26.816317776704736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef41369c0560f7%3A0x38e2a8bae89c1280!2sPrime%20Vision%20International%20Hospitality%20Management%20College!5e0!3m2!1sen!2snp!4v1721322531556!5m2!1sen!2snp" className="w-full h-[500px] mb-10 "  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
         </div>
         <ToastContainer></ToastContainer>
        </>
    )
}

export default Contact