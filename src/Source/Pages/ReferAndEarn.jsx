import {useState} from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  Avatar,
  Badge,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Progress,
  TableContainer,
  useToast,
  Button
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import Members from "../Components/Members";
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Navbar from "../Components/Navbar";
export default function ReferAndEarn() {
  const Frontend_url = import.meta.env.VITE_API_URL_FRONTEND;
  const { name, phone, team, referCode, photo } = useSelector((state) => state.User);
  
  
   const [textToCopy, setTextToCopy] = useState(
     `${Frontend_url}signup/${referCode}`
   ); // Text you want to copy
    const toast = useToast()
  const copyToClipboard = () => {
     
     navigator.clipboard.writeText(textToCopy).then(
       () => {
           toast({
             title: "Referral code copid!",
             status: "success",
             duration: 3000,
             isClosable: true,
           });
       },
       () => {
          toast({
            title: "Unable to copied",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
       }
     );
  };
  
  // console.log(team)
  function GetActiveUser() {
    let count = 0;
    for (var i = 0; i < team.length; i++){
      // console.log(team[i].userType)
      if (team[i]?.userType != "Basic") {
        count++;
      }
    }
    return count;
  }
  return (
    <Box
      pb={[10]}
      // bg="#2658e6"
    >
      <Navbar />

      <Flex
        w={["98%", "95%", "90%"]}
        m={"auto"}
        bg="whiteAlpha.400"
        borderRadius={"10"}
        p={[1, 10]}
        alignItems={"center"}
        justifyContent={"center"}
        my={"10px"}
      >
        <Box
          w={["30%"]}
          borderRadius={"50%"}
          border={"4px solid white"}
          display={["none", "none", "block"]}
        >
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            src={photo}
            alt={name}
          />
        </Box>

        <Box p={[2, 10]}>
          <Text color={"white"} my={-3} fontSize={["2xl", "3xl", "5xl"]}>
            Hey,{" "}
            <span style={{ color: "gold", fontWeight: "bold" }}> {name}</span>
          </Text>
          <Text color={"white"} my={["10px"]} fontSize={["xl"]}>
            Share with your friends and Start earning
          </Text>
          <Flex color="white">
            <Text color="white" mr={[10]}>
              Refer Code: {referCode}
            </Text>
          </Flex>

          <Button
            my={["20px"]}
            colorScheme="whatsapp"
            bg={"blue.500"}
            onClick={() => copyToClipboard()}
          >
            Click to copy link
          </Button>

          <Box w={"100%"} my={10} borderRadius={10} px={10} pb={5}>
            <Text
              color="teal"
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={["2xl"]}
            >
              Challenge
            </Text>
            <List mb={2}>
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text color="white">
                  Earn 100 on 5 valid refer : {GetActiveUser()}/5
                </Text>
              </ListItem>
            </List>

            <Progress
              value={20 * GetActiveUser()}
              borderRadius={20}
              colorScheme="whatsapp"
              hasStripe
            />
          </Box>
        </Box>
      </Flex>

      {/* team */}

      <Box
        w={["98%", "95%", "90%"]}
        m={"auto"}
        bg="whiteAlpha.400"
        borderRadius={"10"}
        p={[1, 10]}
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={["small", "xx-large"]}
          color="white"
        >
          Meet Your Team Members
        </Text>

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th color="white">User</Th>
                <Th color="white">Name</Th>
                <Th color="white">Phone No.</Th>
                <Th color="white">Plan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* call member here */}
              {team?.map((member, i) => {
                return <Members key={i} member={member} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
