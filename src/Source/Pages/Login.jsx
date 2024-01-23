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
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Auth } from "../Services/firebase";
import { useDispatch } from "react-redux";
import { GetRequest } from "../Services/ApiCall";
import { setUser } from "../Redux/Reducers/UserReducers";
import ForgotPassword from "../Components/ForgotPassword";

export default function Login() {
  const url = import.meta.env.VITE_API_URL;
  let [phone, setphone] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate("/");
    }
  }, []);

  function validField() {
    if (phone.length != 10) {
      toast({
        title: "Invalid Phone Number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
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

    return true;
  }

  async function Login(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      validField();
      let data = await GetRequest(`${url}user/login/${phone}/${password}`);
      // console.log("===>", data);
      if (data.status) {
        let userdata = data.data;

        // console.log("use==>", data);
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch(setUser(userdata));
        navigate("/");
      } else {
        console.log(data)
        setIsLoading(false);
        toast({
          title: data.data,
          status: "error",
          duration: 3000,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "something went wrong",
        status: "error",
        duration: 3000,
      });
      console.log(data)
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <Box
      height={window.innerHeight}
      backgroundColor={"#2658e6"}
      py={30}
      px={20}
      pos={"relative"}
    >
      <Image
        pos={"absolute"}
        w={"80px"}
        top={[1, 5]}
        left={[1, 30]}
        h="80px"
        src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR8GeqMZenKekmh_Y-RZIPMrFPE_ykV7e79-vDsCyqAEHh6HzMwigDyEpRBuBylupqLDCtQlwcCRS_uGn6MZLQia_0B=w1920-h907"
        alt="Future IQRA"
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
          <Text as={"em"} textAlign={"center"} fontSize={"3xl"}>
            Welcome Back
          </Text>
          <form onSubmit={Login}>
            <Stack spacing={4} my={5}>
              <InputGroup size={"sm"}>
                <InputLeftAddon children="+91" />
                <Input
                  required
                  type="number"
                  focusBorderColor="lime"
                  placeholder="Phone Number"
                  errorBorderColor="red"
                  onChange={(e) => setphone(e.target.value)}
                />
              </InputGroup>

              <InputGroup size={"sm"}>
                <Input
                  required
                  type={show ? "text" : "password"}
                  focusBorderColor="lime"
                  placeholder="Enter Your Password"
                  errorBorderColor="red"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement
                  onClick={handleClick}
                  cursor={"pointer"}
                  width="4.5rem"
                >
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>

              <Button
                // search it more spinner={<BeatLoader size={8} color="white" />}
                loadingText="fetching your data"
                isLoading={isLoading}
                colorScheme="messenger"
                variant="solid"
                isDisabled={false}
                // onClick={Login}
                type="submit"
              >
                Login Now
              </Button>
            </Stack>
          </form>

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

            <ForgotPassword />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
