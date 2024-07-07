
"use client";

import { Card } from "flowbite-react";

export function LearnCard() {
  return (
   <div className="xl:px-24 py-4 pb-8">
    <h1 className="text-center font-extrabold mb-8 text-[#d49535] text-3xl ">Revolutionalize Learning</h1>
     <div className=" gap-5 grid text-center grid-cols-3">
     <Card  className="max-w-sm learn-card1">
      <h5 className="text-2xl font-bold tracking-tight text-white  ">
      Training and Internships
      </h5>
      <p className="font-normal text-white-700 ">
      Theoretical knowledge is essential, but hands-on experience is equally vital in the hospitality industry.
      </p>
    </Card>
    <Card  className="max-w-sm learn-card2">
      <h5 className="text-2xl font-bold tracking-tight text-white  ">
      Best Resources and Faculties
      </h5>
      <p className="font-normal text-white-700 ">
      Fully functional training kitchens, restaurants, hotel rooms, housekeeping labs, and front desk operations setups.
      </p>
    </Card>
    <Card  className="max-w-sm learn-card3">
      <h5 className="text-2xl font-bold tracking-tight text-white  ">
      Extra-curricular Activities
      </h5>
      <p className="font-normal text-white-700 ">
      A plethora of extra-curricular activities for a sound mental and physical health.
      </p>
    </Card>
    </div>
   </div>
  );
}
