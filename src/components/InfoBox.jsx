import React from "react"

function InfoBox({info, className=""}){

    return (
        <div className="info-box">
            <p className={className}>{info}</p>
        </div>
    )
}

export default InfoBox
