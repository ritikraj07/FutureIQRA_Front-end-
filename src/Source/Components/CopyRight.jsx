import React from "react";
import { Box, Text } from "@chakra-ui/react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Copyright = () => {
  const currentYear = getCurrentYear();

  return (
    <Box userSelect={'none'} bg={"rgb(49, 130, 206)"} width={["100%"]} p={"5px"}>
      <Text color={"white"} fontSize={["sm", "md"]} textAlign="center">
        All rights reserved by{" "}
        <span style={{ userSelect: "none" }}>
          &copy; {currentYear} FutureIQRA
        </span>
      </Text>
    </Box>
  );
};

export default Copyright;
