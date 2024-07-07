import { LearnCard } from "../src/components/Cards/LearnCard"
import { Stats } from "../src/components/Cards/Stats"
import {  CarouselComponent } from "../src/components/Home/Carousel"
import Welcome from "../src/components/Home/Welcome"


function Home(){
    return(
        <>
         <CarouselComponent></CarouselComponent>
         <Welcome></Welcome>
         <LearnCard></LearnCard>
         <Stats></Stats>
        </>
    )
}

export default Home