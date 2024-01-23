import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  FormLabel,
  InputGroup,
  Input,
  Stack,
  FormControl,
  Box,
  Flex,
  InputRightAddon,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostRequest } from "../Services/ApiCall";

export default function WithDraw({ amount }) {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const { name, _id } = useSelector((state) => state.User);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({ upi: "", amount: amount, email: "" });

  function Submit(event) {
    event.preventDefault();
    let message = `I am writing to request a withdrawal of ${data.amount} from my account.
        Current balance is ${amount}
        My account ID is ${_id},
         and my name is ${name}.`;
    let request = {
      report: message,
      email: data.email,
      subject: `Withdrawal Request`,
    };

    PostRequest(`${url}report`, request)
      .then((res) => {
        // console.log(res)
        if (res.status) {
          toast({
            title: "Report Sended",
            status: "success",
            duration: 3000,
          });
        } else {
          console.log("error", res);
          toast({
            title: "Something went Wrong!",
            status: "error",
            duration: 3000,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Button
        colorScheme="whatsapp"
        onClick={onOpen}
        fontSize={16}
        size="sm"
        p={[5]}
      >
        Withdraw
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={Submit}>
              <Stack gap={3}>
                <InputGroup size={"sm"}>
                  <InputLeftAddon>Email</InputLeftAddon>
                  <Input
                    value={data.email}
                    placeholder="example@gmail.com"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    required
                    type="email"
                  />
                </InputGroup>
                <InputGroup size={"sm"}>
                  <InputLeftAddon>UPI ID</InputLeftAddon>
                  <Input
                    type="text"
                    onChange={(e) => setData({ ...data, upi: e.target.value })}
                    required
                    placeholder="example@upi"
                  />
                </InputGroup>

                <InputGroup size={"sm"}>
                  <InputLeftAddon>Amount</InputLeftAddon>
                  <Input
                    type="number"
                    value={data.amount}
                    max={amount}
                    min={1}
                    required
                    onChange={(e) =>
                      setData({ ...data, amount: e.target.value })
                    }
                  />
                </InputGroup>

                <FormControl display="flex" alignItems="center">
                  <input
                    type="checkbox"
                    required
                    style={{
                      marginRight: "8px", // Adjust spacing between checkbox and text
                      transform: "scale(1.5)", // Increase checkbox size for better visibility
                    }}
                  />
                  <Text fontSize="small" color="gray.600">
                    By checking this box, you confirm that you have read and
                    agree to our{" "}
                    <Link to="/terms&conditions" style={{ color: "teal" }}>
                      Terms & Conditions
                    </Link>
                    ,{" "}
                    <Link to="/privacy&policy" style={{ color: "teal" }}>
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link
                      to="/refunds&returns-policy"
                      style={{ color: "teal" }}
                    >
                      Refund & Return Policy
                    </Link>
                    .
                  </Text>
                </FormControl>
                <Text fontSize={"xx-small"} fontWeight={"semibold"}>
                  Note: Your will receive a payment within 48 hours of request.
                </Text>
              </Stack>

              <Flex w="100%" justifyContent="center">
                <Button type="submit" colorScheme="whatsapp">
                  Request Withdrawal
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
