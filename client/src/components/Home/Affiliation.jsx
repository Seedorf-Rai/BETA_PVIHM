import { useSelector } from "react-redux"


function Affiliation(){

    const affs = useSelector((state)=>state.affiliations.affiliations)

    return(
        <section className="xl:px-20 py-3 ">
           <h1 className=" text-yellow-400 text-3xl font-bold text-center" >Our Esteemed Affiliations</h1>
           <div className="py-10 gap-10 flex ">
            {
                affs ? affs.map((aff)=>{
                    return (
                        <div className="bg-[#1F2937] flex-1 rounded-md px-10 py-5 flex flex-col items-center ">
                <img src={`http://localhost:5000/${aff.image}`}  className="w-[300px] h-[200px] object-cover" alt="" />
                <p className="mt-8" dangerouslySetInnerHTML={{ __html: `${aff.description}`  }}>
                </p>
            </div>
                    )
                }) : ''
            }
            {/* <div className="bg-[#1F2937] rounded-md px-10 py-5 flex flex-col items-center">
                <img src="https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/451079189_342301248924085_7071932921088760076_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGb8dQhEmg7RwzsOYuMZvGZfgOU8KVbOYl-A5TwpVs5iXdT8h5DffVOV66FDWjRM_yP2T2NOwGHhayU2HVHrpQL&_nc_ohc=nUpoDNwqTBoQ7kNvgEYfKS9&_nc_ht=scontent.fktm19-1.fna&oh=00_AYBo2S0jwwa3N91d8DUfm8e6zK0tFV5Y8qD7SAIOt12HTg&oe=669BF8EB"  className="w-[300px] h-[200px] object-cover" alt="" />
                <p  className="mt-8">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum a neque vel modi culpa incidunt recusandae odio, ad pariatur maiores eligendi eveniet ipsa atque, exercitationem ratione harum. Maiores, magni placeat. Excepturi, repellat. Odit ipsa voluptatum quam optio debitis, numquam totam atque veritatis, molestias voluptates soluta illo, voluptatibus dolorum placeat qui!
                </p>
            </div> */}
           </div>
        </section>
    )
}

export default Affiliation