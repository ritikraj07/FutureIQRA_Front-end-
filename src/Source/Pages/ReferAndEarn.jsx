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
  return (
    <Box pb={[10]} bg="#2658e6">
      <Box
        // border={"1px solid red"}
        
        w={"100%"}
        // h={"5%"}
        px={[1, 10]}
        // py={5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          w={"80px"}
          h="80px"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR8GeqMZenKekmh_Y-RZIPMrFPE_ykV7e79-vDsCyqAEHh6HzMwigDyEpRBuBylupqLDCtQlwcCRS_uGn6MZLQia_0B=w1920-h907"
          alt="FutureIQRA"
        />
        <Heading display={["none", "none", "block"]} color={"white"}>
          Future IQRA
        </Heading>

        <Flex alignItems={"center"}>
          <Avatar src={photo} />
          <Box ml="3">
            <Text color={"white"} fontWeight="bold">
              {name}
              {/* <Badge ml="1" colorScheme="green">
                #23
              </Badge> */}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex
        w={["98%", "95%", "90%"]}
        m={"auto"}
        bg="white"
        borderRadius={"10"}
        p={[1, 10]}
        alignItems={"center"}
        justifyContent={"center"}
        mb={'10px'}
      >
        <Box w={["30%"]} display={["none", "none", "block"]}>
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            src={photo}
            alt={name}
          />
        </Box>

        <Box p={[2, 10]}>
          <Text color={"black"} my={-3} fontSize={["2xl", "3xl", "5xl"]}>
            Hey,{" "}
            <span style={{ color: "gold", fontWeight: "bold" }}> {name}</span>
          </Text>
          <Text color={"black"} fontSize={["xl", "2xl", "3xl", "4xl"]}>
            Share with your friends and Start earning
          </Text>
          <Flex color="white">
            <Text mr={[10]}>Refer Code: {referCode}</Text>
          </Flex>

          <Button
            my={["20px"]}
            colorScheme="whatsapp"
            bg={"blue.500"}
            onClick={() => copyToClipboard()}
          >
            Click to copy link
          </Button>

          <Box w={"100%"}  my={10} borderRadius={10} px={10} pb={5}>
            <Text color="teal" textAlign={"center"} fontWeight={"bold"} fontSize={["2xl"]}>
              Challenge
            </Text>
            <List mb={2}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Earn 100 on 5 valid refer : {team.length < 6 ? team.length : 5}
                /5
              </ListItem>
            </List>

            <Progress
              value={20 * team.length}
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
        bg="white"
        borderRadius={"10"}
        p={[1, 10]}
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={["small", "xx-large"]}
        >
          Meet Your Team Members
        </Text>

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Name</Th>
                <Th>Phone No.</Th>
                <Th>Plan</Th>
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
