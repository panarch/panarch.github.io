# HW2 - Music Visualizer
## Dynamic Subband Level Meter
Started from "ctp431-2017/session4/ example#1 subband level meter".  
All the sample files are from https://www.youtube.com/audiolibrary/music

### What I did
1. Copy ctp-431-2017 session#4 example#1 source code into my project.
2. Replace visualizer to use html elements instead of canvas.
3. Trial and errors;
Rotating the box which wraps subband bars, changing size of the box and the bars and transform origin, etc.
4. Add sample selecting and local file uploading features.
5. Done!

### Description
Each subband level meter determines what and how to animate.  
`box` wraps `bars` which represents subband level meters.  
`container` wraps the `box`.  
`body` wraps the `container`.  

#### Special features
Lower freq to higher  

Level 0: `body` background color  
Level 1: `container` background color  
Level 2: `box` background color  
Level 3: `box` rotating speed, bigger sounds => faster `box` rotation  
Level 4: Deprecated, it does nothing, only do its own job; `bars`  
Level 5: `box` size, bigger sounds => bigger `box`  
Level 6: Nothing  
Level 7: Nothing  
Level 8: `bars` transform origin velocity, bigger sounds => faster `bars` moving in the `box`  
Level 9: `box` rotating direction(clockwise/counterclockwise), compare with prev sound level, if sound changes more than 20dB, then toggle!  
