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
    
const MarqueeText = styled.p`
    padding: 0 5rem;
    animation: ${movertl} 5000ms linear infinite; 
    animation-play-state: ${(props) => (props.$paused === "true" ? 'paused' : 'running')}; 
`

function Marquee({handleUpdate}) {
    const [isPaused, setIsPaused] = useState(false)
    const [text, setText] = useState("")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [marqueeElementsNumber, setMarqueeElementsNumber] = useState(null)
    const [marquee, setMarquee] = useState([])
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

    useEffect(() => {
        function updateWindowWidth(){
            setWindowWidth(window.innerWidth)
            console.log(windowWidth)
        }

        window.addEventListener('resize', updateWindowWidth)

        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }

    }, [windowWidth])

    // Marquee shows current song name and the name of an artist. 
    // After the end of each song we are sending requests to API to receive new song info.
    // We are updating the currentSong state and calling handleUpdate() to let Header know that song was changed.
    // So if History is opened it should be updated too. 
    useEffect(() => {
        let timeoutId = null

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
                timeoutId = setTimeout(resolve, milliseconds)
            })
        }

        //to avoid frequent requests we wait until the end of song + 2sec, 
        //because currentSong info on server updates a few moments before song starts actually to play in the strim  
        async function waitNextSongAndUpdate() {
            let endTime = getSongStartTime(currentSong.song.DatePlayed) + getSongDuration(currentSong.song.Duration)
            while (endTime + 1000 > getCurrentTime()) {
                await wait(2000); // Wait for 2 second
            }
            updateSong()
        }

        if (currentSong.song.MediaItemId === 0){
            updateSong()
        } else {
            waitNextSongAndUpdate()
        }

        setText((prev) => prev = `${currentSong.song.Artist} - ${currentSong.song.Title}`)

        return () => {
            if (timeoutId){
                clearTimeout(timeoutId)
            }
        }
        
    }, [currentSong, handleUpdate])

    useEffect(() => {
        if (text !== ""){
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            context.font = '16px Rubik, sans-serif'
            // Measure the text
            const textWidth = context.measureText(text).width
            setMarqueeElementsNumber(Math.ceil(windowWidth/(textWidth + 160)) + 1)
        }

    }, [windowWidth, text])

    //For a smooth animation effect the Marquee component should contain different number of text components
    //depending on screen width
    useEffect(() => { 
        if (text !== ""){

            let newMarquee = []
            for (let i = 0; i < marqueeElementsNumber; i++){
                newMarquee.push(<MarqueeText key={`marquee-text-${i}`} $paused={isPaused.toString()}>{text}</MarqueeText>)
            }
    
            setMarquee( prev => prev = newMarquee)
        }
        
    }, [text, isPaused, marqueeElementsNumber])


    return (
        <div className="info-box marquee-box"
                     onMouseEnter={() => setIsPaused(true)}
                     onMouseLeave={() => setIsPaused(false)}
                     onTouchStart={() => setIsPaused(true)}
                     onTouchEnd={() => setIsPaused(false)}
        >
            {marquee}
        </div>
    )
}

export default Marquee