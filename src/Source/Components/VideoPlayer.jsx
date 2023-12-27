import React, { useRef, useState } from "react";
import "../Styles/VideoPlayer.css"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  AspectRatio,
  Input,
} from "@chakra-ui/react";

export default function VideoPlayer({videoId}) {
  
  const containerRef = useRef(null);

  const handleRightClick = (event) => {
    console.log("Right-clicked inside the container");
    event.preventDefault(); // Prevent the default right-click context menu
  };

  const toggleFullScreen = () => {
    const iframe = containerRef.current;

    if (!document.fullscreenElement) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        /* Safari */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        /* IE11 */
        iframe.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };
  return (

        <AspectRatio ratio={16 / 9}>
          <Box
            h={["180px", "270px", "360px", "450px"]}
            w={["320px", "480px", "640px", "800px"]}
            className="container"
            onContextMenu={handleRightClick}
            ref={containerRef}
          >
            <div className="title"></div>
            <Box className="btm"></Box>
            <iframe
              title="DailyMotion Video"
              width="100%"
              height="100%"
              src={`https://www.dailymotion.com/embed/video/${videoId}`}
              // https://dai.ly/k6UIxIXCNuFgFhzKREh
              // https://dai.ly/k35pm5f5HU1gjgzKOBS

              allowFullScreen
              ref={containerRef}
            ></iframe>
            <button
              className="fullScreenBtm"
              onClick={toggleFullScreen}
            ></button>
            <div className="logo"></div>
          </Box>
        </AspectRatio>
      
  );
}

