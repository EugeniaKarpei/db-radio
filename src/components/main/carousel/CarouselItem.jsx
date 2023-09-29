import React from "react"

function CarouselItem({info}){

    return (
        <div
          className={`carousel-item animation-left-right`}>
            {info}
        </div>
    )
}

export default CarouselItem