import { LearnCard } from "../src/components/Cards/LearnCard"
import { Stats } from "../src/components/Cards/Stats"
import {  CarouselComponent } from "../src/components/Home/Carousel"
import CourseSection from "../src/components/Home/CourseSection"
import Welcome from "../src/components/Home/Welcome"


function Home(){
    return(
        <>
         <CarouselComponent></CarouselComponent>
         <Welcome></Welcome>
         <LearnCard></LearnCard>
         <Stats></Stats>
         <CourseSection></CourseSection>
        </>
    )
}

export default Home