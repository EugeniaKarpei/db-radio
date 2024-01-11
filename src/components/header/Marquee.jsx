import React, { useState, useEffect } from "react"
import styled, { keyframes } from 'styled-components'
import {getCurrentTime, getSongStartTime, getSongDuration} from "../../utils"
import { CURRENT_TRACK_URL } from "../../config"

const movertl = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
    `

const MarqueeBox = styled.div `
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
`
    
const MarqueeText = styled.p`
    white-space: nowrap;
    padding: 0 5rem;
    animation: ${movertl} 9000ms linear infinite; 
    animation-play-state: ${(props) => (props.paused === "true" ? 'paused' : 'running')}; 
`


function Marquee({handleUpdate}) {
    const [isPaused, setIsPaused] = useState(false)
    const [text, setText] = useState("")
    const [currentSong, setCurrentSong] = useState({
        song: {
            MediaItemId: 0,
            Album: "",
            Artist: "",
            Title: "",
            Duration: "",
            Picture: "",
            Year: 0,
            DatePlayed: ""
        }
    })
    

    // Marquee shows current song name and the name of an artist. 
    // After the end of each song we are sending requests to API to receive new song info.
    // We are updating the currentSong state and calling handleUpdate() to let Header know that song was changed.
    // So if History is opened it should be updated too. 
    useEffect(() => {
        async function updateSong(){
            const responce = await fetch(CURRENT_TRACK_URL)
            const data = await responce.json()
            const newSong = data[0]
            if (currentSong.song.MediaItemId !== newSong.MediaItemId){
                setCurrentSong({song: {
                    ...newSong
                }})
                handleUpdate()
            }
        }

        function wait(milliseconds) {
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds)
            })
        }

        //to avoid frequent requests we wait until the end of song + 2sec, 
        //because currentSong info on server updates a few moments before song starts actually to play in the strim  
        async function waitNextSong() {
            let endTime = getSongStartTime(currentSong.song.DatePlayed) + getSongDuration(currentSong.song.Duration)
            while (endTime + 1000 > getCurrentTime()) {
                await wait(2000); // Wait for 2 second
            }
            updateSong()
        }

        if (currentSong.song.MediaItemId === 0){
            updateSong()
        } else {
            waitNextSong()
        }

        setText((prev) => prev = `${currentSong.song.Artist} - ${currentSong.song.Title}`)
        
    }, [currentSong, handleUpdate])

    //For a smooth animation effect the Marquee component should contain at least 4 MurqueeText components, and 5 - for screen width > 1000px
    function getMarqueeText(){
        let marqueeNumber = getMarqueeNumber()

        let marqueeText = []
        for (let i = 0; i < marqueeNumber; i++){
            marqueeText.push(<MarqueeText key={`marquee-text-${i}`} paused={isPaused.toString()}>{text}</MarqueeText>)
        }
        return marqueeText
    }

    function getMarqueeNumber(){
        if (window.innerWidth > 1000){
            return 5
        } else if (window.innerWidth < 380){
            return 3
        } else {
            return 4
        }
    }

    return (
        <MarqueeBox  className="info-box"
                     onMouseEnter={() => setIsPaused(true)}
                     onMouseLeave={() => setIsPaused(false)}
                     onTouchStart={() => setIsPaused(true)}
                     onTouchEnd={() => setIsPaused(false)}
        >
            {getMarqueeText()}
        </MarqueeBox>
    )
}

export default Marquee