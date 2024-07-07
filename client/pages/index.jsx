import { LearnCard } from "../src/components/Cards/LearnCard"
import {  CarouselComponent } from "../src/components/Home/Carousel"
import Welcome from "../src/components/Home/Welcome"


function Home(){
    return(
        <>
         <CarouselComponent></CarouselComponent>
         <Welcome></Welcome>
         <LearnCard></LearnCard>
        </>
    )
}

export default Home