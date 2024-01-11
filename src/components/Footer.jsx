import React from "react"
import InfoBox from "./InfoBox"
import {radioGardenUrl} from "../config"

function Footer(){
    return (
    <footer>
        <InfoBox info={<><span>listen live</span>hand-picked underground music</>}/> 
        <div className="footer-info-box">
            <p className="footer-info">we on <a className="light" href={radioGardenUrl} target="_blank" rel="noopener noreferrer">radio garden</a></p>
            <p className="footer-info">© {new Date().getFullYear()} Dzed Bardaitis / FMP / artwork by Gennady Kalinovski</p>
        </div>
    </footer>
    )
}

export default Footer