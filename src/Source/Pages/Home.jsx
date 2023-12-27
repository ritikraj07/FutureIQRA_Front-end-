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
                  src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYStbNUHwtsQRs8p4Fne2lbugtMDZ6DovH3Un4ebbG86gzwoG8XOe3SxlnOhNa60Gnm8um8fjWOivttpvlVE-QAaC0Gw5A=w1920-h907"
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
                  src="https://lh3.googleusercontent.com/fife/AGXqzDnFLXli3EU63-kuIfBrwTG2iOjlK1EZ22uzCJVk0ZW328NjKJN7oawk0PMkMN8sm1aKphboZKfP4Z9Sb_X6meksGTqRteXhEAH3x6GIKvI7oWw39PN29klvyNywhyrgvbLEy6Sw5JYSHQGTHmS5S2aaBKvdz87ShvZZ0DUjHHKLwzZ8i72ZcljMLCPN64Cf6PY7boBeDxjULFVjLGgYKRzCkk9qWietuxppZT4msbo1WmGgXklukcfmmJ1wuWk32Ot4gHVHAhkcEIbGkiJllAcwCWQTffkNnHmSmK_hGtw5otOHlvIdWuSf_TTqpbXklMnWJIsNGi1StXzTiCvBRjuXU7JJLopYGKXbA8XrUc77DtvyGy1MA6c1VsRNjBmofXZYENDeQmCpOAH1UcCRXCS9-O4OJF9SB2diFH4jwwV_QM8baqtvjZ-4jST7lOSCzkhHpkN2dv9xPZP-EMDnu5lfQPlAClEtj4Z4tk4zLwFBwkKx8bWMTcvb6snSD6TU12ohUgyMmitU8WuBw_huKOBzUv2EKomKRx4YY_lWaUOiqNKG6a11EfORmH-j496YYvKXxvQsOzWWPv2oETr_p4hQXDf9VkCPozqDeZyt7QcQsJIIhyzF6k-EDhiFAwsA-jUB6XvxCJKCOROwqnWENsaDSKc9wxy5qrxoOWSvQLAQwYnVcHtjMIZHv54I2IWx2uDn0JE903bjkj2ULYGo7bcbe87LYtAI_CdWC2Nun7K8awN1WC2pD4zJPIG3SfLjRYbUwXwaVt8siIRY_9pcugszrBbPPZTdjVC0r2HacspdPDzj8lHEybk5DkQbwGmJ9Emn-T7qR75pcCKsouBqQwvw3ZWT9wAW_WT0u_OU3Vt4PBvr8m50SAn1zFSOmZ6sXcG-QZlZB8mcJEiGdY-pm1NKa5UCUabaYbYoC03gmpihSIRjtcLfUpvE6QAy13162kvu-u6iwQA2bOun6Av2-TQuk7Nur-R6bfD_R_9L5nmj0hcttCI_WGeTy_yY6X3VpLKCBSXwsXCwSNinLvEf4o42S8Vml-lpcrmVrJMRhJrq-QB58_8-BuwaJxekI267mD3rbskEUfPmbzDM-D7z2ALjIn84SES36MtD8QeSgdqoMM6S_HT0_BnfArF3EzzBxyprcCeZ6Ztu51abJ1FDFRA2-9jYyiRH2ASlxviwYTw0I_ebLdNqV4h7GeFdZp4qqYf56b2l1HXnnRsiwQjzm9V3YSyiCr5VEIKbO5P8ON42IUYeLZGB5YZtk8bkTQgcx5hvqSxBYZR9sAHbu2ikMOmnBj1d-rGUi_0aqlEsHINeJNieZI4Kkc8DnOxbXvkexHLL6SgJ04IC_mZWc8rVM-GXwomwzQDF8UIDPIZqOZwQzldnLdtMoxyY1Cs7eaJwdSvMhVjva3CnC8gJDLjtRY8KneOa_jFPv5v0h6lAVjqtSb6JlbNdZlm5VHJuTwdYbd0NbuxX26Ab2xVYC4NE_LdB6oSmOP0VXyBfLYRQde9KHKG6E00PYwaJkYri6ruLR5yPKu67HvLcwiRnlDT0sN0FWGbPJfvN=w1165-h907"
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
                  src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYTLQJOP5Kg306L-ENUB4gGM4ASedxHbyOx3NsHkCXwd-LzqnLsBJeDRMaDUNyjL6RbuDMO9mV_Zi6a-AhR3uOLy8WFTfw=w1920-h907"
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
                  src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYSCZFKGhe0xx-bgEs-0uRLt2PnupYkV5hdwfECM0fIcDNoaUMItrBcnlmxBsuYaCP_vZ7yrqDj_FX1IEnDrpWP0fJ3bTg=w1920-h907"
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
