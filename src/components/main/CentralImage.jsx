import React from "react"

function CentralImage({src, alt, isHistoryOpened}) {
    return (
        <div className="logo-img-box">
            <img src={src} alt={alt} className={isHistoryOpened ? "small-width-central-image" : ""}/>
        </div>
    )
}

export default CentralImage