import React, { useState, useCallback } from "react"
import MusicPlayer from "./MusicPlayer"
import Marquee from "./Marquee"
import HistoryButton from "./history/HistoryButton"
import HistoryDropdown from "./history/HistoryDropdown"
import InfoBox from "../InfoBox"

function Header({isPlaying, togglePlay, isHistoryOpened, toggleHistoryOpened}){
    const [historyShouldUpdate, setHistoryShouldUpdate] = useState(false)

    const handleSongUpdate = useCallback(() => {
        setHistoryShouldUpdate(prev => prev = true)
    }, [setHistoryShouldUpdate])
    

    const handleHistoryUpdate = useCallback(() => {
        setHistoryShouldUpdate(prev => prev = false)
    }, [setHistoryShouldUpdate])
    

    return (
        <header>
            <div className="header-top-box">
                <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay}/>
                <HistoryButton isOpened={isHistoryOpened} onClick={toggleHistoryOpened}/>
            </div>
            {isHistoryOpened && 
            <InfoBox info="streaming history:" className="history-info"/>}
            {isHistoryOpened && 
            <HistoryDropdown 
               isOpened={isHistoryOpened} 
               shouldUpdate={historyShouldUpdate} 
               handleUpdate={handleHistoryUpdate} 
            />
            }
            <Marquee handleUpdate={handleSongUpdate}/>
        </header>
    )
}

export default Header