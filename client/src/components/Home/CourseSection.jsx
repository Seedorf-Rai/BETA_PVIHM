import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CourseCard } from "../Cards/Course";
import { useSelector } from "react-redux";

function CourseSection() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const courses = useSelector((state)=>state.courses.courses)
  return (
    <div className="xl:px-20 my-12">
      <h1 className="text-4xl text-center font-extrabold text-[#d49535]">
        Courses Offered
      </h1>
      <Slider className="ps-14 my-10" {...settings}>
        {
            courses ?  courses.map((course)=>{
                return <CourseCard image={course.featured} title={course.title} ></CourseCard>
               }):''
        }

      </Slider>
    </div>
  );
}
export default CourseSection;
