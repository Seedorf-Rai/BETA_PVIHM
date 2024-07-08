
"use client";

import { Card } from "flowbite-react";
import { Link } from "react-router-dom";


export function CourseCard({id,image, title}) {
  return (
    <Link to={`/course/${id}`}>
     <Card
      className="max-w-sm bg-transparent course-card"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={`http://localhost:5000/${image}`}
    >
      <h5 className="text-2xl font-bold tracking-tight text-white">
        {title}
      </h5>
    </Card>
    </Link>
  );
}
