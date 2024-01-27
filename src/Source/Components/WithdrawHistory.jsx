import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Badge,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";
import { formatReadableDate } from "../Services/DateRelated";

const WithdrawHistoryModal = ({ withdrawHistory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  function StatusColor(status) {
    if (status === "Success") {
      return "#61E461"; // Green
    } else if (status === "Failed") {
      return "#FF0000"; // Red
    } else {
      return "#FFAA00"; // Yellow
    }
  }

  return (
    <>
      <Text fontWeight={"normal"} onClick={() => setIsOpen(true)}>
        Withdrawal History
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW={{ base: "96%", sm: "95%", md: "80%" }}>
          <ModalHeader>Withdrawal History</ModalHeader>
          <Stack ml={10} spacing={2} direction="row" mb={4}>
            <Badge colorScheme="green">Success</Badge>
            <Badge colorScheme="red">Failed</Badge>
            <Badge colorScheme="yellow">Pending</Badge>
          </Stack>
          <ModalCloseButton />
          <ModalBody>
            <Flex overflowX="auto">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Amount</Th>
                    <Th>Email</Th>
                    
                    <Th>UPI ID</Th>

                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {withdrawHistory.map((withdraw, index) => (
                    <Tr key={index} bg={StatusColor(withdraw.status)}>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {withdraw.amount}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {withdraw.email}
                      </Td>
                    
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {withdraw.upi_Id}
                      </Td>

                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {formatReadableDate(withdraw?.createdAt)}{" "}
                        
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithdrawHistoryModal;
