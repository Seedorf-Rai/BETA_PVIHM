


"use client";

import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function CarouselComponent() {
    const carousel = useSelector((state)=>state.carousel.carousels)

    // console.log(carousel);
  return (
    <div className="h-56 sm:h-64 xl:h-[520px] ">
      <Carousel slideInterval={5000}>
        {
           carousel ? carousel.map((item)=>{
             console.log(item.image,'hello');
            return(
                    <img
                    src={`http://localhost:5000/${item.image}`}
                    className="h-full w-full object-cover  "
                    />
                    )
                    }) : ""
        }
      </Carousel>
    </div>
  );
}
