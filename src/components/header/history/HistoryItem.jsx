import React from "react"
import { BiCopy } from "react-icons/bi"
import { CopyToClipboard } from 'react-copy-to-clipboard';

function HistoryItem({artist, songTitle, startTime, onAir}){
    const itemText = `${artist} - ${songTitle}`

    return(
        <div className={`history-item ${onAir && 'light'}`}>
            <p className="history-item-time">{`${startTime}`}</p>
            <p className="history-item-song">{itemText}</p>
            <CopyToClipboard text={itemText}>
                <BiCopy className={`copy-btn ${onAir && 'light'}`} title="copy song name"/>
            </CopyToClipboard>
        </div>
    )
}

export default HistoryItem