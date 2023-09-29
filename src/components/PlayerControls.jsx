import React from "react"
import { FaPlay, FaPause } from "react-icons/fa6"

function PlayerControls({isPlaying, togglePlay, lightMode = false}){

    return (
        <div className="music-player">
            {isPlaying ? <FaPause onClick={togglePlay} className={`player-btn ${lightMode && `light`}`}/>
                       : <FaPlay onClick={togglePlay} className={`player-btn ${lightMode && `light`}`}/>
            }
            <p className={lightMode ? `light` : ""}>{isPlaying ? "pause" : "listen"}</p>
        </div>
    )
}

export default PlayerControls