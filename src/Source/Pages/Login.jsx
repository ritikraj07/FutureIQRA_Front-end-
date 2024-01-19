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
        toast({
          title: data.data,
          status: "error",
          duration: 3000,
        });
      }
      setIsLoading(false);
    } catch (error) {
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
        src="https://lh3.googleusercontent.com/fife/AGXqzDn3Voj6hLNDoifJr3clj2pjt9obdj3dvbrXhmiVl59IDGvJ-ykZyfT0O015fLC1wO-PmmbHKr7uuV8Ng8WsymahoFzC4jvaYZ2-leFnQuQrbsD8QGoHcp9ctMrLADVoo4yBe1U9bvODg5uhZ5KL8jbNKR1OXNH3FkpsD8wCrQcllXuz2ooHa73bFroYYs-hH6PztvZao5ZObqoDy0AYUDi_UIdZnLj0nEcWRU6v1qrJESPH54b30KnAtDEevxL7qudlj88bvQm-qmR6gdzRop4P97neUg7PjOsRUbvg20ms8Lp4gNe9J-LwCjR2xt-Dkz4TMZ_8HR8eYW81l6jDN7UZ5d2Ut55muUTfSqsCqDNy1zxQOsLb3nRgqZjBhppV1846ENvdN3vR4nykQ4UU5EvZuI7XRK2PROs0hoDu485xnet70zk_CrilKeBCfudxExJGVe1QnqihTXk1kuUWMvkCQVOVKs5-hK66JFL9ZH0hSaTyFwlHnR6sbxcUCT7ZygyKMC-CPbU2eaUeKdwtXOlwPmXlE0Nf2czosPjYwc51SxVD72HUZpxEvdp4JIn0jlWYlQ0oy7g6-bi_jySaDwC7tpewPIKCaLuTr-8vp-X-8k6jzEY8Y3ZfUeQ3-ggApUY6E7h5y6nBBd-xj7QKVq9Bs5nU_H7zm5N1uSeVwds-d07WHtSWZfB9vS0HYdyld21kEAY5dlX-HPpcpbwauQlGl-lD3BnL0bHJHj_KG0MW0FijRy1iEOy0VuQ6kEg9A1wv6zOkSd7wfig084bRztFw48kV4tMrGuaDyWMaxTOY4XXL6SPul9FR6KtPKWClGXXJ_8gKz526b3pWREMxiBw5sPaTc05ige9YP6W3Xz8ZJBUQw3Rehc9s3TFeLYINHBNc4KvVnIQskVXJ-IMMeVd9aFTpy2sLX6R803-7s5Icw8kOPVWXuULTDgpIjx1sX6gS1FOFD99sduRAntelcLfkxQbplP0BSNJyfxLxNCzoEpneY61zlo4B3Zv02U2cWu4gbCC2dVRGAKUIW7vFIZbRsB5zaUUCyL7Z5yW0sbsPITk3-9I-x_VkOrwbvGHlFlQBj1rpf62KMWdUW1B_loIaDhXw2SIvXK-jkpkvu-iXMRB7n-YC_IYuWv6fj79FoROnl2cz6kA_Plk1rUgj53ABiDdAlvH-E2a6SYDxDpkROp2frYJ4Z6jhR09tnko-dRwues2vZowdTGZWl6BxYp161V4xKNpFtTsBZOoHkPgg8UzsN42dywyuYHJldUvbOFL3JvQN6c8jsJD9KZkjE79RLYDRO8qzC85yp4El0S6R0O6WfupCuc24z9MZ_w9ZqSUcSAHESClGumF0Upt_QQRSc2m0VOjEjWcIfdBWrJLMDp0p4wBJwn0fcS_ualtXZIMVwJkeYTfQXTr0IoGRc-DqhU6YQAagWi26jZPOl9InRrlGf_qfEtvvNfti9Q6YJBaLlRObIlNsPyd2KjjHc44tr8V8Ud9RAggsgPcYdyZqNpUd457kyS4UryDK7MXfMbFyAzIOolavuddXWCHGsbnCUL2gSr17=w1920-h907"
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
