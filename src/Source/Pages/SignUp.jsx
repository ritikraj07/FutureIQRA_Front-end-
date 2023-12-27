import { useEffect, useState } from "react";
// require("dotenv").config();
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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Auth } from "../Services/firebase";
import { useSelector, useDispatch } from "react-redux";
import { GetRequest, PostRequest } from "../Services/ApiCall";
import { setUser } from "../Redux/Reducers/UserReducers";

export default function SignUp() {
  const url = import.meta.env.VITE_API_URL;
  let {refercode} = useParams() || ''
  // console.log(refercode)
  const [referCode, setReferCode] = useState(refercode);
  // console.log('state', referCode)
  let [phone, setphone] = useState("");
  const [user, setuser] = useState(null);
  const [otp, setOTP] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [isVerify, setVerify] = useState(false);
  const [isDisabled, setDisable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const GetOTP = async () => {
    if (!checkFields()) {
      return
    }

    let isUserExistWithThisNumber = await GetRequest(url + `user/phone/${phone}`);
    if (isUserExistWithThisNumber) {
      toast({
        title: "Account Already Exist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    } else {
      console.log("no account found with this number");
    }

    phone = "+91" + phone;

    console.log(name, phone, referCode, password, photo);

    try {
      const recaptcha = new RecaptchaVerifier(Auth, "recaptcha", {});
      const conformation = await signInWithPhoneNumber(Auth, phone, recaptcha);
      setuser(conformation);
      setVerify(true);
      setDisable(true);
    } catch (error) {
      console.log(error);
    }
  };


  async function VerifyOTP() {
    
    user.confirm(otp)
      .then((res) => {
        console.log(res)
        Register()
      }).catch((error) => {
        console.log(error);
        toast({
          title: "something went wrong",
          status: "error",
          duration: 3000,
          description: error,
        });
    })


  }

  const Register = async () => {
    checkFields();
    if (!isVerify) {
      toast({
        title: "Enter Valid OTP",
        status: error,
        duration: 3000,
        isClosable: true,
      });

      return;
    }


    // create account here

    let data = {
      name: name,
      phone: phone,
      password: password,
      referby: referCode,
      image:
        "https://6570556c9c603163391e8ba0--joyful-kheer-008761.netlify.app/Avatar/avatar1.jpg",
    };

    let result = await PostRequest(url + `user/create-account`, data);
    console.log("==>", result);

    if (result.status) {
      localStorage.setItem("token", JSON.stringify(result.token));
      dispatch(setUser(result.data));
      navigate("/");
    } else {
      toast({
        title: "something went wrong",
        status: "error",
        duration: 3000,
      });
    }
  };

  function checkFields() {
    if (name.length == 0) {
      toast({
        title: "Enter Your Name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
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
        title: "Weak Password",
        status: "error",
        duration: 3000,
        isClosable: true,
        description: "Length must be 6",
      });
      return false;
    }

    if (phone.length > 10 || phone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
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
          <Text as={"em"} fontSize={"3xl"}>
            Register now
          </Text>

          <Stack spacing={4} my={5}>
            <InputGroup size={"sm"}>
              <InputLeftAddon children="+91" />
              <Input
                type="number"
                focusBorderColor="lime"
                placeholder="Phone Number"
                errorBorderColor="red"
                disabled={isDisabled}
                onChange={(e) => setphone(e.target.value)}
              />
            </InputGroup>

            <InputGroup size={"sm"}>
              <InputLeftAddon children="Refer Code" />
              <Input
                type="number"
                value={referCode}
                disabled={isDisabled}
                focusBorderColor="lime"
                placeholder="Enter Refer Code"
                onChange={(e) => setReferCode(e.target.value)}
              />
            </InputGroup>
            <InputGroup size={"sm"}>
              <Input
                type="text"
                disabled={isDisabled}
                focusBorderColor="lime"
                placeholder="Enter Your Name"
                errorBorderColor="red"
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>

            {/* <InputGroup size={"sm"}>
              <Input
                type="file"
                disabled={isDisabled}
                onChange={(e)=>setPhoto(e.target.files[0])}
                focusBorderColor="lime"
                accept="image/*"
              />
            </InputGroup> */}
            <Box my={-3} id="recaptcha"></Box>

            <InputGroup size={"sm"}>
              <Input
                type="text"
                disabled={isDisabled}
                focusBorderColor="lime"
                placeholder="Create a 6 digit login password"
                errorBorderColor="red"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <InputGroup size={"sm"}>
              <InputLeftAddon children="OTP" />
              <Input
                type="number"
                focusBorderColor="lime"
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
              <InputRightAddon
                children="Get OTP"
                bg={"#2658e6"}
                color="white"
                cursor={"pointer"}
                onClick={() => {
                  GetOTP();
                }}
              />
            </InputGroup>
            <Button
              // spinner={<BeatLoader size={8} color="white" />}
              loadingText="Registering You"
              isLoading={false}
              colorScheme="messenger"
              variant="solid"
              isDisabled={!isDisabled}
              onClick={VerifyOTP}
            >
              Register Now
            </Button>
          </Stack>
          <Text
            color="#2658e6"
            cursor={"pointer"}
            onClick={() => {
              navigate("/login");
            }}
          >
            LogIn Now
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
