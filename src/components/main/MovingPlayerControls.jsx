import React from "react"

function MovingPlayerControls({children, position}){

    return (
        <div className="moving-player-controls" 
             style={{
                position: 'absolute',
                left: position.x + 80, //approximate x,y position of moving-player-controls relative to cursor
                top: position.y - 160, 
                transform: 'translate(-50%, -50%)', // Center the control to cursor
          }}>
            {children}
        </div>
    )
}

export default MovingPlayerControls