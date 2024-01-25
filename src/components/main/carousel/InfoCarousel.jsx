import React, { useState, useEffect } from "react"
import CarouselItem from "./CarouselItem"
import { getCurrentTimeStr, getCurrentDay, getCurrentMonth, carouselItemsContent } from "../../../utils"

function InfoCarousel(){
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState(null) 
    
    function getCurentDateTimeInfo(){
        const date = new Date()
        return (<h1 className="date-time-info carusel-item-text">
                {`It's ${getCurrentDay(date)} ${getCurrentTimeStr(date)}`}
                <br />
                {`${getCurrentMonth(date)} ${date.getDate()}`}
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
    }, [currentItem, currentIndex])

    return (
        <div className="info-carousel">
            {currentItem}
        </div>
    )
}

export default InfoCarousel