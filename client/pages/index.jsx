import { LearnCard } from "../src/components/Cards/LearnCard"
import { Stats } from "../src/components/Cards/Stats"
import Affiliation from "../src/components/Home/Affiliation"
import {  CarouselComponent } from "../src/components/Home/Carousel"
import CourseSection from "../src/components/Home/CourseSection"
import Director from "../src/components/Home/Director"
import MessageCEO from "../src/components/Home/MessageCEO"
import Welcome from "../src/components/Home/Welcome"


function Home(){
    return(
        <>
         <CarouselComponent></CarouselComponent>
         <Welcome></Welcome>
         <LearnCard></LearnCard>
         <Stats></Stats>
         <CourseSection></CourseSection>
         <MessageCEO></MessageCEO>
         <Director></Director>
         <Affiliation></Affiliation>
        </>
    )
}

export default Home