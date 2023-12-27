import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Table,
  useToast,
  Th,
  Select,
  Td,
  TableContainer,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  TagLabel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
  NumberInput,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Badge,
  InputLeftElement,
  AspectRatio,
  PinInput,
    PinInputField,
  HStack
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";



export default function ForgotPassword() {
    const url = import.meta.env.VITE_API_URL;
    const [stage, setStage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure();
      const [show, setShow] = useState(false);
      const handleClick = () => setShow(!show);

  
  const toast = useToast();

  const handleEditorChange = (newContent) => {
    
    };
    

    
    function ChangeTitle() {
        
        if (stage == "1") {
            return "1. Enter Phone No."
        } else if (stage == "2") {
            return "2. Enter OTP"
        } else {
            return "3. Reset Password"
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
          minH={"40vh"}
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
              <Stack w="70%">
                <InputGroup size={"sm"}>
                  <InputLeftAddon children="+91" />
                  <Input
                    bg="white"
                    required
                    type="number"
                    focusBorderColor="lime"
                    placeholder="Phone Number"
                    errorBorderColor="red"
                    onChange={(e) => {}}
                  />
                </InputGroup>

                <Button onClick={() => setStage(2)} colorScheme="messenger">
                  Get OTP
                </Button>
              </Stack>
            )}

            {stage == 2 && (
              <Stack w="100%">
                <HStack m={"auto"}>
                  <PinInput bg="white" placeholder="🔑">
                    <PinInputField bg="white" />
                    <PinInputField bg="white" />
                    <PinInputField bg="white" />
                    <PinInputField bg="white" />
                    <PinInputField bg="white" />
                    <PinInputField bg="white" />
                  </PinInput>
                </HStack>
                <Button
                  onClick={() => setStage(3)}
                  colorScheme="messenger"
                  m="auto"
                  w="70%"
                >
                  Submit
                </Button>
              </Stack>
            )}
            {stage == "3" && (
              <Stack>
                <InputGroup size="md">
                  <Input
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
                <Button onClick={() => setStage(1)} colorScheme="teal">
                  Reset Password
                </Button>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
