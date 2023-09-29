import React from "react"

function CentralImage({src, alt}) {
    return (
        <div className="logo-img-box">
            <img src={src} alt={alt}/>
        </div>
    )
}

export default CentralImage