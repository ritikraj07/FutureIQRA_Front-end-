import React from "react";

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
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function BuyCouse({ title, name, phone, onSubmit, setEmail, isLoading }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        hover={{ color: "blue.500", bg: "white" }}
        alignSelf={"flex-end"}
        m={"14px auto"}
        borderRadius={"0"}
        color={"white"}
        bg={"blue.500"}
        variant="solid"
        onClick={onOpen}
      >
        Buy Now
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmit}>
            <ModalBody pb={6}>
              <Stack gap={2}>
                <FormControl>
                  <FormLabel fontSize={"sm"}>Name</FormLabel>
                  <Input
                    size="xs"
                    required
                    ref={initialRef}
                    placeholder="Name"
                    value={name}
                    disabled
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Phone No</FormLabel>
                  <Input
                    required
                    size="xs"
                    type="number"
                    placeholder="phone no"
                    value={phone}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    required
                    size="xs"
                    placeholder="example@gmail.com"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

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
                    <Link to="/terms-and-conditions" style={{ color: "teal" }}>
                      Terms & Conditions
                    </Link>
                    ,{" "}
                    <Link to="/privacy-and-policy" style={{ color: "teal" }}>
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link
                      to="/refunds-and-returns-policy"
                      style={{ color: "teal" }}
                    >
                      Refund & Return Policy
                    </Link>
                    .
                  </Text>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Pay Now
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
