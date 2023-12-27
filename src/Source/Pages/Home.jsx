import { } from "react";
import '../Styles/Card.css'
import {
  Box,
  Text,
  Image,
  Flex,
  Avatar,
  Badge,
  Button,
  Card,
  SimpleGrid,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {CheckIcon} from '@chakra-ui/icons'
import { PatchRequest } from "../Services/ApiCall";
import { setAvatar } from "../Redux/Reducers/UserReducers";


export default function Home() {
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const dispatch = useDispatch()
  const { name, phone, photo, rank, wallet, _id, isAdmin } = useSelector(
    (state) => state.User
  );

  let avatars = [
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar1.jpg",
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar2.jpg",
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar3.jpg",
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar4.jpg",
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar5.jpg",
    "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar6.jpg",
  ];

  const navigate = useNavigate();



  
  function CreateAvater({ avatar}) {
    
    function UpdateAvatar() {
      
      PatchRequest(`${url}user/update-photo`, { image:avatar, _id })
        .then((res) => {
          // console.log(res)
          if (res.status) {
            dispatch(setAvatar(avatar))
            localStorage.setItem('token', JSON.stringify(res.token))
            toast({
              status: 'success',
              title: 'Avatar Updated',
              duration:3000
            });
          } else {
            toast({
              title: 'Something went wrong',
              status: 'error',
              duration: 3000
            })
          }
          
        }).catch((error) => {
          console.log(error)
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            description: error.message
          });
      })
    }

    return (
      <Box position="relative" display="inline-block">
        <Image
          borderRadius={"50%"}
          m={5}
          w={"80px"}
          cursor={"pointer"}
          src={avatar}
          onClick={UpdateAvatar}
        />

        {/* Blue tick badge */}
        {avatar == photo ? (
          <Badge
            position="absolute"
            top={5}
            right={4}
            bg="blue.500"
            color="white"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"25px"}
            h={"25px"}
            borderRadius={"50%"}
          >
            <CheckIcon />
          </Badge>
        ) : (
          <></>
        )}
      </Box>
    );
 }
  

  return (
    <Box
      width={"100%"}
      backgroundColor={"#2658e6"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      paddingBottom={[20]}
    >
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avatars</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexWrap="wrap"
              alignItems={"center"}
              justifyContent={"center"}
            >
              {avatars?.map((avatar) => {
                return <CreateAvater key={avatar} avatar={avatar} />;
              })}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* top navbar */}

      <Box
        // border={"1px solid red"}
        w={"100%"}
        // h={"5%"}
        px={[1, 10]}
        py={5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          w={"60px"}
          h="60px"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYT4pJC1nPny1dBkj3MZPA_ib-RBu24aZ3vG-9ltTDBixLf8x5Cv5qSehG5mH-kY_fkURG2R7ZcTaG-PQaeoPX1S8HADFg=w1920-h907"
          alt="Referral Rich"
        />

        <Heading display={["none", "none", "block"]} color={"white"}>
          Future IQRA
        </Heading>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton>
              <Avatar src={photo} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Change Avatar</MenuItem>
              <MenuItem onClick={() => navigate("/my-learning")}>
                My Learning
              </MenuItem>
              {isAdmin && (
                <MenuItem onClick={() => navigate("/admin/dashboard")}>
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>

          {/* photo input  */}

          <Box ml="3">
            <Text color={"white"} fontWeight="bold">
              {name}
              {/* <Badge ml="1" colorScheme="green">
                #{rank}
              </Badge> */}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* mid navbar */}
      <Flex w={["90%", "80%", "70%"]} flexDir={"column"}>
        {/*  */}

        <Box my={2} w="100%">
          <Text fontSize={"2xl"} my={1} color="white">
            Current Balance
          </Text>
          <Flex
            justifyContent={"space-between"}
            w={"100%"}
            alignItems={"center"}
          >
            <Button fontSize={20} size="sm">
              <Text color={"#25D366"} mr={2}>
                ₹
              </Text>
              {wallet}
            </Button>

            <Button w="20%" colorScheme="whatsapp" p={5} size="sm">
              Withdraw
            </Button>
          </Flex>
        </Box>

        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          marginTop={10}
          columns={3}
          spacing={10}
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <Card
            h={["270px"]}
            boxShadow={"rgba(0, 0, 0, 35) 0px 5px 15px"}
            borderRadius={10}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => navigate("course/vip1")}
          >
            <Heading color={"gold"}>VIP 1</Heading>
          </Card> */}

          <Box
            className="card-container"
            onClick={() => navigate("/course/vip1")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front" bg="white">
                <Heading color={"gold"}>VIP1</Heading>
              </Box>
              <Box className="back">
                <p>VIP1</p>
              </Box>
            </Box>
          </Box>

          <Box
            className="card-container"
            onClick={() => navigate("/course/vip2")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front" bg="white">
                <Heading color={"gold"}>VIP2</Heading>
              </Box>
              <Box className="back">
                <p>VIP2</p>
              </Box>
            </Box>
          </Box>

          <Box
            className="card-container"
            onClick={() => navigate("/refer&earn")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front">
                <Image
                  className="image"
                  h={["270px"]}
                  borderRadius={10}
                  src="src\Source\Assets\referearn.png"
                />
              </Box>
              <Box className="back">
                <p>Refer And Earn</p>
              </Box>
            </Box>
          </Box>

          <Box
            className="card-container"
            onClick={() => navigate("/leaderboard")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front">
                <Image
                  className="image"
                  h={["270px"]}
                  borderRadius={10}
                  src="src\Source\Assets\leaderboard.jpg"
                />
              </Box>
              <Box className="back">
                <p>Leaderboard</p>
              </Box>
            </Box>
          </Box>

          {/* <Card
            h={["270px"]}
            boxShadow={"rgba(0, 0, 0, 35) 0px 5px 15px"}
            borderRadius={10}
            cursor={"pointer"}
            onClick={() => navigate("/q&a")}
          >
            <Image
              h={["270px"]}
              borderRadius={10}
              src="src\Source\Assets\qna.png"
            />
          </Card> */}

          <Box
            className="card-container"
            onClick={() => navigate("/q&a")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front">
                <Image
                  className="image"
                  h={["270px"]}
                  borderRadius={10}
                  src="src\Source\Assets\qna.png"
                />
              </Box>
              <Box className="back">
                <p>Clear Your Doubts </p>
              </Box>
            </Box>
          </Box>

          <Box
            className="card-container"
            onClick={() => navigate("/report")}
            m={"auto"}
          >
            <Box className="card">
              <Box className="front">
                <Image
                  className="image"
                  h={["270px"]}
                  borderRadius={10}
                  src="src\Source\Assets\contract.png"
                />
              </Box>
              <Box className="back">
                <p>Contract Us</p>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
