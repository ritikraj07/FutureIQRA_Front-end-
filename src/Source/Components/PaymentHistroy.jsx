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
  useMediaQuery
} from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";
import { formatReadableDate } from "../Services/DateRelated";

const PaymentHistoryModal = ({ paymentHistory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
 const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  function StatusColor(status) {
    
    if (status === "Success") {
      return "#61E461"; // Green
    } else if (status === "Failed") {
      return "#FF0000"; // Red
    } else if (status === "Expire") {
      return "silver"; // Silver
    } else {
      return "#FFAA00"; // Yellow
    }
  }

  return (
    <>
      <Text fontWeight={"normal"} onClick={() => setIsOpen(true)}>
        Payment History
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW={{ base: "96%", sm: "95%", md: "80%" }}>
          <ModalHeader>Payment History</ModalHeader>
          <Stack ml={10} spacing={2} direction="row" mb={4}>
            <Badge colorScheme="green">Success</Badge>
            <Badge colorScheme="red">Failed</Badge>
            <Badge colorScheme="yellow">Pending</Badge>
            <Badge bg="silver" colorScheme="silver">Expire</Badge>
          </Stack>
          <ModalCloseButton />
          <ModalBody>
            <Flex overflowX="auto">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>{isSmallerThan600 ? <FaRupeeSign /> : "Amount"}</Th>
                    <Th>Mode</Th>
                    <Th>Date</Th>
                    <Th>Product</Th>
                    <Th>Expire Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paymentHistory.map((payment, index) => (
                    <Tr key={index} bg={StatusColor(payment.status)}>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {payment.orderId}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {payment.amount}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {payment.paymentMode}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {formatReadableDate(payment.transactionDate)}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {payment.product}
                      </Td>
                      <Td
                        color={"white"}
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      >
                        {payment.expireTime}
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

export default PaymentHistoryModal;
