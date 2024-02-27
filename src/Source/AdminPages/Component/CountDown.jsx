import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

function DeadlineCountdown() {
  // Set the deadline date
  const deadline = new Date("2024-02-28T23:59:59");
  const countDownBarHeight = useRef(5);

  // Calculate the time remaining
  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const difference = deadline - currentTime;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

 useEffect(() => {
   const { days, hours, minutes, seconds } = timeRemaining;
   const totalSecondsRemaining =
     days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
   const totalSecondsInDeadline = 24 * 60 * 60;
   const percentageRemaining = (
     (totalSecondsRemaining / totalSecondsInDeadline) *
     100
   ).toFixed(6);
   countDownBarHeight.current = 100 - percentageRemaining;
 }, [timeRemaining]);


  return (
    <Flex
      bg="black"
      alignItems={"center"}
      color="white"
      justifyContent={"center"}
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={100000}
      w={"100%"}
      h={`${countDownBarHeight.current}%`}
    >
      <Box mr={4}>
        <Text color="white" fontSize="lg">
          Days: {timeRemaining.days}
        </Text>
      </Box>
      <Box mr={4}>
        <Text color="white" fontSize="lg">
          Hours: {timeRemaining.hours}
        </Text>
      </Box>
      <Box mr={4}>
        <Text color="white" fontSize="lg">
          Minutes: {timeRemaining.minutes}
        </Text>
      </Box>
      <Box>
        <Text color="white" fontSize="lg">
          Seconds: {timeRemaining.seconds}
        </Text>
      </Box>
    </Flex>
  );
}

export default DeadlineCountdown;
