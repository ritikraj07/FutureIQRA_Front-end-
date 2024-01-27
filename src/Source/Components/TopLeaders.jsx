import {} from "react";
import { Box, Heading, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaCrown } from "react-icons/fa";
export default function TopLeaders({ leaderboard }) {
  let lb = leaderboard;
 
  
  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
      <Flex alignItems={"end"} justifyContent={"center"}>
        {/* second */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"}>
            <Box bg={"#22C35E"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[1].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontWeight="extrabold"
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {lb[1].name}
            </Text>
            <Text
              color={"#22C35E"}
              fontWeight={"extrabold"}
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {" "}
              ₹ {lb[1].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"150px"}
            w={"100%"}
            bg={"#22C35E"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/rank2.png"
            />
          </Flex>
        </Flex>
        {/* first */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"}>
            <Box bg={"gold"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[0].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontWeight="extrabold"
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {lb[0].name}
            </Text>
            <Text
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
              color={"white"}
              fontWeight={"extrabold"}
            >
              {" "}
              ₹ {lb[0].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"200px"}
            w={"100%"}
            bg={"gold"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/rank1.png"
            />
          </Flex>
        </Flex>

        {/* third */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"} overflowX={"hidden"}>
            <Box bg={"#264653"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[2].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontSize={["small", "xs", "sm"]}
              fontWeight="extrabold"
              noOfLines={1}
            >
              {lb[2].name}
            </Text>
            <Text
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
              color={"#264653"}
              fontWeight={"extrabold"}
            >
              {" "}
              ₹ {lb[2].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"100px"}
            w={"100%"}
            bg={"#264653"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/rank3.png"
            />
          </Flex>
        </Flex>
      </Flex>

      <Box
        bg="red"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["260px", "300px", "350px"]}
        h={"50px"}
      ></Box>
      <Box
        bg="green"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["280px", "350px", "400px"]}
        h={"50px"}
      ></Box>
      <Box
        bg="blue"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["300px", "400px", "500px"]}
        h={"50px"}
      ></Box>
    </Flex>
  );
}
