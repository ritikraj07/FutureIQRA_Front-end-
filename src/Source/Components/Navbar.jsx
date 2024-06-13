import React from "react";

import {
  Box,
  Image,
  Tab,
  TabList,
  Tabs,
  Flex,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Navbar({ ...args }) {
  const { name, photo, isLoggedIn } = useSelector((state) => state.User);
  
  let navitage = useNavigate();
  return (
    <Box
      // border={"1px solid red"}
      w={"100%"}
      // backgroundColor={"purple"}
      bg="#5426c0"
      px={[1, 10]}
      py={["0", "2px"]}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      {...args}
    >
      <Image
        cursor={"pointer"}
        w={"60px"}
        h="60px"
        borderRadius={"50%"}
        src="https://futureiqra.onrender.com/image/icon.png"
        alt="FutureIQRA"
        onClick={() => navitage("/")}
      />

      <Flex alignItems={"center"}>
        <Avatar src={photo} />
        <Box m={0} ml="3">
          <Text color={"white"} fontWeight="bold">
            {name}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
