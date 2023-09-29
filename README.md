
This project was created with React, Javascript and CSS. It is online live radio. 
It is based on https://samcloud.spacial.com/ streaming service. 

# Project structure

App
  -Header
    -MusicPlayer
      -PlayerControls
    -HistoryButton
    **Note: InfoBox & HistoryDropdown render after HistoryButton was pressed**
    -InfoBox
    -HistoryDropdown
      -HistoryItem
    -Marquee
      **Note: Marquee contains styled components MarqueeBox & MarqueeText**
  -main
    -CentralImage
    -InfoCarousel
      -CarouselItem
    **Note: MovingPlayerControls renders after the cursor enters the main area and follows the cursor**
    -MovingPlayerControls
      -PlayerControls
  -Footer
    -InfoBox
    -div with info

    Project also have utils.js and config.js. First one contains helper functions to parse Date/Time strings to determine song duration, to get current date/time for the History and InfoCarousel components. And config.js contains urls used in project.

## Main project states

   App has two main states "isPlaying" and "isHistoryOpened". 
   Marquee has "currentSong" state.
   History has a "history" state which updates after "historyShouldUpdate" state from Header sets as true or HistoryDropdown was opened.





