import React, { useState } from "react"
import MusicPlayer from "./MusicPlayer"
import Marquee from "./Marquee"
import HistoryButton from "./history/HistoryButton"
import HistoryDropdown from "./history/HistoryDropdown"
import InfoBox from "../InfoBox"
import { HISTORY_URL } from "../../config"

function Header({url, isPlaying, togglePlay, isHistoryOpened, toggleHistoryOpened}){
    const [historyShouldUpdate, setHistoryShouldUpdate] = useState(false)

    function handleSongUpdate(){
        setHistoryShouldUpdate(prev => prev = true)
    }

    function handleHistoryUpdate(){
        setHistoryShouldUpdate(prev => prev = false)
    }

    return (
        <header>
            <div className="header-top-box">
                <MusicPlayer url={url} isPlaying={isPlaying} togglePlay={togglePlay}/>
                <HistoryButton isOpened={isHistoryOpened} onClick={toggleHistoryOpened}/>
            </div>
            {isHistoryOpened && 
            <InfoBox info="streaming history:" className="history-info"/>}
            {isHistoryOpened && 
            <HistoryDropdown isOpened={isHistoryOpened} shouldUpdate={historyShouldUpdate} handleUpdate={handleHistoryUpdate} url={HISTORY_URL}/>
            }
            <Marquee handleUpdate={handleSongUpdate}/>
        </header>
    )
}

export default Header