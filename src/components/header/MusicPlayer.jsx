import React, { useEffect, useRef } from "react"
import PlayerControls from "../PlayerControls"

function MusicPlayer({url, isPlaying, togglePlay}){
    const playerRef = useRef()

    //if isPlaying is true ('play' button was pressed) new audio stream should be started,
    //if not - current audio stream should be paused
    useEffect(() => {
        if (isPlaying) {
            playerRef.current = new Audio(url);
            playerRef.current.play()
        } else {
            if (playerRef.current){
                playerRef.current.pause()
            }
        }
    }, [isPlaying])

    // Pause and clean up on unmount
    useEffect(() => {
        return () => {
            if (playerRef.current && isPlaying){
                playerRef.current.pause()
            }
        }
      }, [])

    return (
        <div className="music-player-box">
            <PlayerControls isPlaying={isPlaying} togglePlay={togglePlay} />
        </div>
    )
}

export default MusicPlayer