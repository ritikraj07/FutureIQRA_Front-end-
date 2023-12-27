import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Image,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Auth } from "../Services/firebase";
import { useDispatch } from "react-redux";
import { GetRequest } from "../Services/ApiCall";
import { setUser } from "../Redux/Reducers/UserReducers";
export default function Login() {
  const url = import.meta.env.VITE_API_URL;
  let [phone, setphone] = useState("");

  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate('/')
    }
  },[])
  
  

  function validField() {
        if (phone.length !=10) {
          toast({
            title: "Invalid Phone Number",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return false
    }
    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    
    return true
  }


  async function Login() {
    try { 
 validField();
 let data = await GetRequest(`${url}user/login/${phone}/${password}`);
 console.log("===>", data);
 if (data.status) {
   let userdata = data.data;

   console.log("use==>", data);
   localStorage.setItem("token", JSON.stringify(data.token));
   dispatch(setUser(userdata));
   navigate("/");
 } else {
   toast({
     title: "something went wrong",
     status: "error",
     duration: 3000,
   });
 }
    } catch (error) {
      toast({
        title: "something went wrong",
        status: "error",
        duration: 3000,
      });
    }
   
  }



  return (
    <Box
      height={window.innerHeight}
      backgroundColor={"#2658e6"}
      py={30}
      px={20}
    >
      <Image
        pos={"fixed"}
        w={"60px"}
        h="60px"
        src="src\Source\Assets\referralrich.png"
        alt="Referral Rich"
      />
      <Box w={"100%"} display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Heading color={"white"}>Welcome</Heading>
        <Text color={"white"}>Do Refer Be Rich</Text>

        {/* box*/}

        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          w={350}
          bg={"white"}
          borderRadius={50}
          px={8}
          py={5}
        >
          <Text as={"em"} textAlign={'center'} fontSize={"3xl"}>
            Welcome Back
          </Text>

          <Stack spacing={4} my={5}>
            <InputGroup size={"sm"}>
              <InputLeftAddon children="+91" />
              <Input
                type="number"
                focusBorderColor="lime"
                placeholder="Phone Number"
                errorBorderColor="red"
                onChange={(e) => setphone(e.target.value)}
              />
            </InputGroup>

            <InputGroup size={"sm"}>
              <Input
                type="text"
                focusBorderColor="lime"
                placeholder="Enter Your Password"
                errorBorderColor="red"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </InputGroup>

            <Button
              // search it more spinner={<BeatLoader size={8} color="white" />}
              // loadingText="Registering You in Refferal Rich"
              // isLoading
              colorScheme="messenger"
              variant="solid"
              isDisabled={false}
              onClick={Login}
            >
              Login Now
            </Button>
          </Stack>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              color="#2658e6"
              cursor={"pointer"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp Now
            </Text>

            <Text
              color="#2658e6"
              cursor={"pointer"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Forgot Password
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
