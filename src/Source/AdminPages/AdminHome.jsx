import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Td,
  Tr,
  Tbody,
  Table,
  Th,
  useToast,
  Thead,
} from "@chakra-ui/react";
import { TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";
import { GetRequest, PatchRequest } from "../Services/ApiCall";

export default function AdminHome() {
  const url = import.meta.env.VITE_API_URL;
  const [users, setUser] = useState([]);
  const [userPlan, setUserPlan] = useState();
  const toast = useToast();
  useEffect(() => {
    GetAllUsers();
  }, []);

  function GetAllUsers() {
    GetRequest(`${url}user/all`).then((res) => {
      // console.log(res)
      if (res.status) {
        setUser(res.data.users);
        setUserPlan(res.data.userCounts);
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 3000,
          
        })
      }
    });
  }
  function InfoTable({ title, value }) {
    return (
      <Tr>
        <Td>{title}</Td>
        <Th>{value}</Th>
      </Tr>
    );
  }

  function UserBox({ member }) {
    let [user, setThisUser] = useState(member);
    const { isOpen, onOpen, onClose } = useDisclosure();

    function UpdateUser() {
      PatchRequest(`${url}user/update-user`, user)
        .then((res) => {
          if (res.status) {
            toast({
              title: "User Data Updated",
              status: "success",
              duration: 3000,
            });
          } else {
            toast({
              title: "something went worng",
              status: "error",
              description: res.message,
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "something went worng",
            status: "error",
            description: error,
            duration: 3000,
          });
        });
    }

    function HandleChange(key, value) {
      console.log(key, value);
      setThisUser({ ...user, [key]: value });
    }

    return (
      <Box
        onClick={onOpen}
        w={["300px"]}
        m={2}
        borderRadius={5}
        cursor={"pointer"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{user.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Tbody>
                  <InfoTable title={"Name"} value={user.name} />
                  <InfoTable title={"Phone"} value={user.phone} />

                  <Tr>
                    <Td>Wallet</Td>
                    <Th>
                      <Input
                        onChange={(e) => HandleChange("wallet", e.target.value)}
                        value={user.wallet}
                      />
                    </Th>
                  </Tr>

                  <Tr>
                    <Td>Subscription</Td>
                    <Th>
                      <Select
                        onChange={(e) =>
                          HandleChange("userType", e.target.value)
                        }
                      >
                        <option>{user.userType}</option>
                        <option>Basic</option>
                        <option>VIP1</option>
                        <option>VIP2</option>
                      </Select>
                    </Th>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>

            <ModalFooter justifyContent={"space-around"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>{" "}
              <Button variant="solid" colorScheme="teal" onClick={UpdateUser}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Image p={"10px"} src={user.image} />
        <Box px={1}>
          <Table>
            <Tbody>
              <InfoTable title={"Name"} value={user.name} />
              <InfoTable title={"Phone"} value={user.phone} />
              <InfoTable title={"Plan"} value={user.userType} />
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  }

  function NoOfBasicUser() {
    let basicUser = users.length;
    if (userPlan?.VIP1) {
      basicUser = basicUser - userPlan.VIP1
    }
    if (userPlan?.VIP2) {
      basicUser = basicUser - userPlan.VIP2
    }
      return basicUser;
  }

  return (
    <Box w="100%">
      <Flex
        alignItems={["center"]}
        justifyContent={["space-between"]}
        // m={["10px"]}
        flexDir={["column", "column", "row"]}
        bg={"#393E4F"}
        p={["10px"]}
      >
        <Heading textAlign={"start"} color="white">
          Dashboard
        </Heading>
        {/* <InputGroup
          bg={"white"}
          borderRadius={10}
          w={["80%", "60%", "30%"]}
          my={[1, 2, 0]}
        >
          <Input
            focusBorderColor="lime"
            placeholder="Type Search Words"
            _placeholder={{ opacity: 1, color: "black" }}
          />
          <InputRightElement
            pointerEvents="auto"
            cursor={"pointer"}
            children={<SearchIcon color="black" />}
          />
        </InputGroup>
        <Select bg="white" placeholder="Filter" w={["80%", "60%", "20% "]}>
          <option> New Reports First</option>
          <option> Old Reports First</option>
        </Select> */}
      </Flex>

      <Box
        h="90vh"
        overflowY="scroll"
        sx={{
          /* Hide scrollbar */
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Opera
          },
          "&": {
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
          },
        }}
      >
        <Box
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
          w={['100%', '90%']}
          m={'5px auto'}
        >
          <Heading textAlign={"center"}>User Data</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Number of VIP1 Users</Th>
                <Th>{userPlan?.VIP1 ? userPlan?.VIP1 : 0}</Th>
              </Tr>
              <Tr>
                <Th>Number of VIP2 Users</Th>
                <Th>{userPlan?.VIP2 ? userPlan?.VIP2 : 0}</Th>
              </Tr>
              <Tr>
                <Th>Number of Basic Users</Th>
                <Th>
                  <NoOfBasicUser />
                </Th>
              </Tr>
              <Tr>
                <Th>Total Number of Users</Th>
                <Th>{users.length}</Th>
              </Tr>
            </Thead>
          </Table>
        </Box>

        <Flex flexWrap={"wrap"} justifyContent={"center"}>
          {users?.map((user) => {
            return <UserBox key={user._id} member={user} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
}





















//  <Grid
//    templateRows="repeat(2, 1fr)"
//    templateColumns={[
//      "repeat(1,1fr)",
//      "repeat(1,1fr)",
//      "repeat(2,1fr)",
//      "repeat(2,1fr)",
//      "repeat(3, 1fr)",
//    ]}
//    gap={2}
//  >
//    {/* box for items */}
//    <Flex
//      flexDir={"column"}
//      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
//      w={"250px"}
//      p={["10px"]}
//      alignItems={"center"}
//      justifyContent={"center"}
//      m={["10px"]}
//    >
//      <Flex align={"center"} justifyContent={"space-between"}>
//        <Text color={"gold"} fontWeight={"bold"}>
//          VIP1
//        </Text>
//        <TriangleUpIcon color={"whatsapp.600"} />
//      </Flex>
//      <Flex justifyContent={"center"}>
//        <CircularProgress
//          value={(userPlan?.VIP1 / users?.length) * 100}
//          color="green"
//          //   border={"1px solid black"}
//          size={["100px"]}
//          thickness={["10px"]}
//        >
//          <CircularProgressLabel>{userPlan?.VIP1}</CircularProgressLabel>
//        </CircularProgress>
//      </Flex>
//    </Flex>

//    {/* box for items */}
//    <Box
//      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
//      w={"250px"}
//      p={["10px"]}
//      alignItems={"center"}
//      justifyContent={"center"}
//      m={["10px"]}
//    >
//      <Flex align={"center"} justifyContent={"space-between"}>
//        <Text color={"gold"} fontWeight={"bold"}>
//          VIP2
//        </Text>
//        <TriangleUpIcon color={"blue"} />
//      </Flex>
//      <Flex justifyContent={"center"}>
//        <CircularProgress
//          value={(userPlan?.VIP2 / users?.length) * 100 || 0}
//          color="blue"
//          //   border={"1px solid black"}
//          size={["100px"]}
//          thickness={["10px"]}
//        >
//          <CircularProgressLabel>{userPlan?.VIP2 || 0}</CircularProgressLabel>
//        </CircularProgress>
//      </Flex>
//    </Box>
//    {/* box for items */}
//    <Box
//      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
//      w={"250px"}
//      p={["10px"]}
//      alignItems={"center"}
//      justifyContent={"center"}
//      m={["10px"]}
//    >
//      <Flex align={"center"} justifyContent={"space-between"}>
//        <Text color={"gold"} fontWeight={"bold"}>
//          Total Users
//        </Text>
//        <TriangleUpIcon color={"black"} />
//      </Flex>
//      <Flex justifyContent={"center"}>
//        <CircularProgress
//          value={100}
//          color="black"
//          //   border={"1px solid black"}
//          size={["100px"]}
//          thickness={["10px"]}
//        >
//          <CircularProgressLabel>{users.length}</CircularProgressLabel>
//        </CircularProgress>
//      </Flex>
//    </Box>
//  </Grid>