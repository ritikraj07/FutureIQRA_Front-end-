import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputLeftAddon,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Auth } from "../Services/firebase";
import { GetRequest, PatchRequest } from "../Services/ApiCall";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [stage, setStage] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [verificationId, setVerificationId] = useState("");

  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState(["", "", "", "", "", ""]);
  const handleClick = () => setShow(!show);

  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const handlePinChange = (value, index) => {
    const updatedPin = [...pin];
    updatedPin[index] = value || ""; // Make sure the value is not undefined
    setPin(updatedPin);
  };

  const sendPasswordResetOTP = async (event) => {
    setloading(true);
    event.preventDefault();
    try {
      let isUserExistWithThisNumber = await GetRequest(
        url + `user/phone/${phoneNumber}`
      );
      if (!isUserExistWithThisNumber) {
        toast({
          title: "No User Found",
          status: "info",
          duration: 3000,
          description: "create an account",
        });
        setloading(false);
        navigate("/signup");
        return;
      }

      const recaptcha = new RecaptchaVerifier(Auth, "recaptcha-container", {});
      const conformation = await signInWithPhoneNumber(
        Auth,
        `+91${phoneNumber}`,
        recaptcha
      );
      setVerificationId(conformation);
      setStage(2);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const verifyOTP = (event) => {
    setloading(true);
    event.preventDefault();

    const formattedPin = pin.join(""); // Join the array into a single string
    // console.log("Entered Pin:", formattedPin);
    // console.log(pin);
    verificationId.confirm(formattedPin).then(() => {
      setStage(3);
      setloading(false);
    });
    // .catch((error) => {
    //   console.log(error);
    //   toast({
    //     title: "Something went wrong",
    //     status: "error",
    //   });
    //   setloading(false);
    // });

    setloading(false);
  };

  const resetPassword = (event) => {
    setloading(true);
    event.preventDefault();
    // setloading(true);
    PatchRequest(`${url}user/reset-password`, {
      phone: phoneNumber,
      password: password,
    }).then((res) => {
      if (res.status) {
        toast({
          title: "Password Updated Successfully",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: res.message,
          description: res.description,
          status: "error",
          duration: 3000,
        });
      }
    });
    setStage(1);
    onClose();
    setloading(false);
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Removes non-numeric characters
    if (input.length <= 10) {
      // Set the desired length here
      setPhoneNumber(input);
    }
  };

  function ChangeTitle() {
    if (stage == "1") {
      return "1. Enter Phone No.";
    } else if (stage == "2") {
      return "2. Enter OTP";
    } else {
      return "3. Reset Password";
    }
  }

  return (
    <>
      <Text onClick={onOpen} cursor={"pointer"} color="blue.500">
        Forget Password
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundImage={
            "https://t4.ftcdn.net/jpg/00/96/16/55/360_F_96165533_wniDWHng1aa8S2wMU84VYuajAuORUCuH.jpg"
          }
          // minH={"40vh"}
          margin={["auto 10px"]}
        >
          <ModalHeader>
            <ChangeTitle />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            {stage == "1" && (
              <form onSubmit={(e) => sendPasswordResetOTP(e)}>
                <Stack w="100%">
                  <Box m={"auto"} id="recaptcha-container"></Box>
                  <InputGroup size={"sm"}>
                    <InputLeftAddon children="+91" />
                    <Input
                      minLength={10}
                      maxLength={10}
                      bg="white"
                      required
                      type="text" // Use type="text" for input validation purposes
                      focusBorderColor="lime"
                      placeholder="Phone Number"
                      errorBorderColor="red"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </InputGroup>
                  <Button
                    loadingText={"Sending..."}
                    isLoading={loading}
                    type="submit"
                    colorScheme="messenger"
                  >
                    Get OTP
                  </Button>
                </Stack>
              </form>
            )}

            {stage == 2 && (
              <form onSubmit={(e) => verifyOTP(e)}>
                <Stack w="100%">
                  <HStack m={"auto"}>
                    <PinInput
                      bg="white"
                      required
                      minLength={6}
                      maxLength={6}
                      placeholder="🔑"
                    >
                      {pin.map((digit, index) => (
                        <PinInputField
                          required
                          bg={"white"}
                          key={index}
                          value={digit}
                          onChange={(e) =>
                            handlePinChange(e.target.value, index)
                          }
                          // isReadOnly={pin[index].length === 1} // Prevent editing after one character is entered
                        />
                      ))}
                    </PinInput>
                  </HStack>
                  <Button
                    type="submit"
                    colorScheme="messenger"
                    m="auto"
                    w="70%"
                    loadingText={"Submitting..."}
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            )}
            {stage == "3" && (
              <form onSubmit={(e) => resetPassword(e)}>
                <Stack>
                  <InputGroup size="md">
                    <Input
                      minLength={6}
                      maxLength={20}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      bg="white"
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
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
                    loadingText={"Resetting Password"}
                    isLoading={loading}
                    type="submit"
                    colorScheme="teal"
                  >
                    Reset Password
                  </Button>
                </Stack>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
