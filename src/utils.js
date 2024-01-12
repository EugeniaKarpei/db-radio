const carouselItemsContent = [
    "date",
    <><br /><h1>DZED BARDAITIS <br /> RADIO</h1></>
 ]

function getCurrentTime(){
    return new Date().getTime()
}

// returns time in hr:min format 
function getCurrentTimeStr(date){
    let hours = date.getHours() // Get the hours (0-23)
    let minutes = date.getMinutes() // Get the minutes (0-59)
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`
}

function getCurrentDay(date){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[date.getDay()]
}

function getCurrentMonth(date){
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"]
    return months[date.getMonth()]
}

// used to get timestamp from strings with "/Date(1695681039417+0000)/" format
function getSongStartTime(dateStr){
    let match = dateStr.match(/\/Date\((\d+)([+-]\d{4})\)\//)
    
    if (match) {
        const timestamp = parseInt(match[1], 10)
        return timestamp
    } else {
        console.log("Invalid date string")
        return 0 
    }
}

// used to get string with song's start time in 'hr:min' format
function getSongStartTimeStr(dateStr){
    const date = new Date(getSongStartTime(dateStr))
    return getCurrentTimeStr(date)
}

// used to get song duration in ms from strings with "PT12M3.121S" format
function getSongDuration(durationStr){
    const match = durationStr.match(/PT(\d+)M([\d.]+)S/)
    
    if (match) {
        const minutes = parseInt(match[1], 10)
        const seconds = parseInt(match[2], 10)
        
        return ((minutes * 60) + seconds) * 1000
    } else {
        console.log("Invalid duration format")
        return 0
    }
}

export {getCurrentTime, getSongStartTime, getSongDuration, getSongStartTimeStr, getCurrentTimeStr, getCurrentDay, getCurrentMonth, carouselItemsContent}