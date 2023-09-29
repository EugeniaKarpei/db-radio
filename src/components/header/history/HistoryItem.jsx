import React from "react"
import { BiCopy } from "react-icons/bi"

function HistoryItem({artist, songTitle, startTime, onAir}){

    function getArtistAndSong(){
        return `${artist} - ${songTitle}`
    }

    function handleClick(){
        navigator.clipboard.writeText(getArtistAndSong())
    }

    return(
        <div className={`history-item ${onAir && 'light'}`}>
            <p className="history-item-time">{`${startTime}`}</p>
            <p className="history-item-song">{getArtistAndSong()}</p>
            <BiCopy className={`copy-btn ${onAir && 'light'}`} onClick={handleClick} title="copy song name"/>
        </div>
    )
}

export default HistoryItem