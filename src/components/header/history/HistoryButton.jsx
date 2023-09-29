import React from "react"
import { FaXmark } from "react-icons/fa6"
import {BiHistory} from "react-icons/bi"

function HistoryButton({isOpened=false, onClick}){

    return (
        <div className="history-btn-box">
            {isOpened ? <FaXmark className="history-btn" onClick={onClick}/>: 
                               <BiHistory className="history-btn" onClick={onClick}/>}
        </div>
    )
}

export default HistoryButton