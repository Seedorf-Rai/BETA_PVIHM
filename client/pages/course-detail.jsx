import { useSelector } from "react-redux";
import { Route, useParams } from "react-router-dom";
import { Accordion } from "flowbite-react";

function CourseDetail() {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((course) => course._id === id);
  if (!course) {
    return <div>Course not found</div>;
  }
  //   const bgImageURL = `http://localhost:5000/${course.featured}`;
  const bgImageURL = `http://localhost:5000/${course.featured}`;
  const correctedBgImageURL = bgImageURL.replace(/\\/g, "/");
  console.log(bgImageURL);
  console.log(course.title);
  const packages = course.package.split(',')
  const benefits = course.benefits_of_learning.split(',')
  return (
    <>
      {course ? (
        <>
          <div
            className="course-top bg-no-repeat bg-cover  bg-center  "
            style={{
              backgroundImage: `url( ${correctedBgImageURL} )`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay"></div>
            <div className="course-title">
              <h1 className="text-4xl font-bold">{course.title}</h1>
            </div>
          </div>
          <div className="course-content xl:px-20 my-10 ">
            <h2 className="mb-4">
              <span className="text-xl font-bold">Course Description : </span>
              <p dangerouslySetInner={{ __html: `${course.description}` }} ></p>
            </h2>
            <h2>
              <span className="text-xl font-bold">Course Duration : </span>
              {course.duration}
            </h2>
            <Accordion className="my-10 bg-black">
              <Accordion.Panel className="bg-black">
                <Accordion.Title className="acc-head bg-transparent hover:bg-black">Who must take this course ?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 acc-content">
                    {
                        course.who_must_take
                    }
                  </p>

                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel className="bg-black">
                <Accordion.Title className="acc-head bg-transparent hover:bg-black">What is in the package? What will you learn?</Accordion.Title>
                <Accordion.Content>
                  {
                    packages ? packages.map((el)=>{
                        return <li className="mb-2 acc-content">
                          {el}
                        </li>
                    }) : ''
                  }

                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel className="bg-black">
                <Accordion.Title className="acc-head bg-transparent hover:bg-black">What are the benefits of learning this course?</Accordion.Title>
                <Accordion.Content>
                  {
                    benefits ? benefits.map((el)=>{
                        return <li className="mb-2 acc-content">
                          {el}
                        </li>
                    }) : ''
                  }

                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CourseDetail;
