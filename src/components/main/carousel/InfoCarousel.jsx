import React, { useState, useEffect } from "react"
import CarouselItem from "./CarouselItem"
import { getCurrentTimeStr, getCurrentDay, getCurrentMonth } from "../../../utils"

function InfoCarousel(){
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState(null)
    const carouselItemsContent = [
        <><h1>DZED BARDAITIS <br /> RADIO</h1></>,
       "date"
    ]
    
    function getCurentDateTimeInfo(){
        const date = new Date()
        return (<h1 className="date-time-info">
                {`It's ${getCurrentDay(date)} ${getCurrentMonth(date)} ${date.getDate()}`}
                <br />
                {`${getCurrentTimeStr(date)}`}
                </h1>
        )
    }

    //each item from carouselItemsContent sets as a currentItem of carousel for 12sec
    useEffect(()=> {
        function updateCurrentItem(){
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItemsContent.length)
            let currentInfo = carouselItemsContent[currentIndex]
            if (carouselItemsContent[currentIndex] === "date"){
                currentInfo = getCurentDateTimeInfo()
            }
            setCurrentItem([<CarouselItem key={currentIndex} info={currentInfo}/>])
        }

        if (currentItem === null){
            updateCurrentItem()
        }
        const interval = setInterval(updateCurrentItem, 12000)

        return () => clearInterval(interval)
    }, [currentItem])

    return (
        <div className="info-carousel">
            {currentItem}
        </div>
    )
}

export default InfoCarousel