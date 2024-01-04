import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Copyright = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let text = isHovered ? "Visit Profile" : "Ritik Raj";
  const linkStyle = {
    cursor: "pointer",
    color: isHovered ? "#3182CE" : "white", // Adjusted color on hover
    transition: "color 0.3s ease-in-out", // Smooth transition effect
    fontSize: isHovered? '14px':'16px'
  };
  const currentYear = getCurrentYear();

  return (
    <Box
      userSelect="none"
      bg="black" // Adjusted background color
      width="100%"
      p="5px"
    >
      <Text
        fontWeight="normal"
        color="white"
        fontSize={["sm", "md"]}
        textAlign="center"
      >
        All rights reserved by{" "}
        <span style={{ userSelect: "none" }}>
          &copy; {currentYear} FutureIQRA
        </span>
        <span> | </span>
        <span>Developed by </span>
        <span
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            window.open("https://www.linkedin.com/in/ritik-raj07/", "_blank");
          }}
        >
          {text}
        </span>
      </Text>
    </Box>
  );
};

export default Copyright;
