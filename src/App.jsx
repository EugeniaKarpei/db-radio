import React, { useRef, useEffect, useState } from "react"
import PlayerControls from "./components/PlayerControls"
import MovingPlayerControls from "./components/main/MovingPlayerControls"
import CentralImage from "./components/main/CentralImage"
import Footer from "./components/Footer"
import Header from "./components/header/Header"
import InfoCarousel from "./components/main/carousel/InfoCarousel"
import { PLAYER_URL, centralImageSrc, centralImageAlt } from "./config"

export default function App(){
    const [isPlaying, setIsPlaying] = useState(false)
    const [showCursor, setShowCursor] = useState(false)
    const mainRef = useRef(0)
    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0})
    const [isHistoryOpened, setIsHistoryOpened] = useState(false)

    function togglePlay() {
        setIsPlaying(prevValue => !prevValue)
    }

    function toggleHistoryOpened(){
        setIsHistoryOpened(prevValue => !prevValue)
    }

    // mousemove, mouseenter, mouseleave events added to the 'div' element inside 'main'. MovingPlayerControls renders if cursor enters div.
    // cursorPosition changes on mousemove. It used by MovingPlayerControls to follow cursor
    useEffect(() => {
        const currentRef = mainRef.current;

        function onMouseEnter(e){
            setShowCursor(prev => prev = true)
        }

        function onMouseLeave(){
            setShowCursor(prev => prev = false)
        }

        function onMouseMove (e){
            setCursorPosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        currentRef.addEventListener('mousemove', onMouseMove)
        currentRef.addEventListener('mouseenter', onMouseEnter)
        currentRef.addEventListener('mouseleave', onMouseLeave) 

        return () => {
            currentRef.removeEventListener('mousemove', onMouseMove)
            currentRef.removeEventListener('mouseenter', onMouseEnter)
            currentRef.removeEventListener('mouseleave', onMouseLeave)
        }
            
    }, [])

    
    return (
      <>
        <Header url={PLAYER_URL} 
                isPlaying={isPlaying} 
                togglePlay={togglePlay}
                isHistoryOpened={isHistoryOpened}
                toggleHistoryOpened={toggleHistoryOpened}
        />
        <main>
            <div className="main-content-box" ref={mainRef} onClick={togglePlay}>
                <CentralImage src={centralImageSrc} alt={centralImageAlt}/>
                <InfoCarousel />
                {(showCursor && !isHistoryOpened) && 
                <MovingPlayerControls position={cursorPosition}>
                    <PlayerControls isPlaying={isPlaying} togglePlay={togglePlay} lightMode={true}/>
                </MovingPlayerControls>
                }
            </div>
        </main>
        <Footer/>
      </>
    )
  }