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
  const { name, photo } = useSelector((state) => state.User);
  let navitage = useNavigate();
  return (
    <Box
      // border={"1px solid red"}
      w={"100%"}
      backgroundColor={"#2658e6"}
      px={[1, 10]}
      py={["0", "2px"]}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      {...args}
    >
      <Image
        cursor={"pointer"}
        w={"80px"}
        h="80px"
        src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR8GeqMZenKekmh_Y-RZIPMrFPE_ykV7e79-vDsCyqAEHh6HzMwigDyEpRBuBylupqLDCtQlwcCRS_uGn6MZLQia_0B=w1920-h907"
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
