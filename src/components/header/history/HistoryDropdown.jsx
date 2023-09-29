import React, { useEffect, useState } from "react"
import HistoryItem from "./HistoryItem"
import { getSongStartTimeStr } from "../../../utils"

function HistoryDropdown({shouldUpdate, handleUpdate, isOpened, url}){
    const [history, setHistory] = useState([])

    //history state should be updated if history-dropdown was opened or if a new song was started while history was opened.
    useEffect(()=>{
        async function updateHistory(){
            const responce = await fetch(url)
            const data = await responce.json()
            let newHistory = data.map(song => song)
            setHistory(newHistory)
            handleUpdate()
        }

        if(shouldUpdate || isOpened){
            updateHistory()
        }

    }, [shouldUpdate, isOpened])

    //There are 5 items in the history dropdown: 4 songs which were previously played and the current song on top. 
    //Current song has "on air" string instead of time in the "start time" column.
    function getItems(){
        let items = history.map((item, i) => {
            let onAir = false
            let startTime = ""
            if (i === 0){
                onAir = true
                startTime = "on air"
            } else {
                startTime = getSongStartTimeStr(item.DatePlayed)

            }
            return <HistoryItem key={item.HistoryItemId} artist={item.Artist} songTitle={item.Title} startTime={startTime} onAir={onAir}/>
        })
        return items 
    }
    
    
    return (
        <div className="history-dropdown">
            {getItems()}
        </div>
    )
}


export default HistoryDropdown