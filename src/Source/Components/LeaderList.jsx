import {memo} from "react";
import { Box, Heading, Flex, Image, Text } from "@chakra-ui/react";
function LeaderList({ name, money, rank, image }) {
  var bg = ["#FF3920", "#FE8125", "#FEB712", "#DF50CE", "#A136DE"];

  function getRandomColor() {
    var bg = ["#FF3920", "#FE8125", "#FEB712", "#DF50CE", "#A136DE"];
    var randomIndex = Math.floor(Math.random() * bg.length);
    return bg[randomIndex];
  }
  return (
    <Flex
      alignItems={"center"}
      bg={getRandomColor()}
      borderRadius={"50px"}
      padding={["1px", "5px"]}
      my={"5px"}
      px={["10px", "20px"]}
    >
      <Flex
        w={["30%", "30%"]}
        alignItems={"center"}
        justifyContent={["flex-start"]}
      >
        <Text
          //   border={"1px solid red"}
          color={"white"}
          noOfLines={1}
          fontSize={["x-small", "xs", "sm"]}
        >
          # {rank}
        </Text>
        <Image
          src={image}
          w={["30px", "40px", "50px", "60px"]}
          h={["30px", "40px", "50px", "60px"]}
          borderRadius={"50%"}
          border={"2px solid white"}
          mx={["4px","5px", "10px","20px"]}
        />
      </Flex>
      <Flex
        flexDir={["row", "row", "row", "column"]}
        w={["50%", "60%", "70%", "80%"]}
        // border={"1px solid red"}
        justifyContent={["space-between"]}
      >
        <Text noOfLines={1} color={"white"}>
          {name}
        </Text>
        <Text noOfLines={1} color={"white"}> ₹ {money} </Text>
      </Flex>
    </Flex>
  );
}


export default memo(LeaderList)