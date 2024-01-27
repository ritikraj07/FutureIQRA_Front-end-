import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Td,
  Tr,
  Tbody,
  Table,
  Th,
  useToast,
  Thead,
} from "@chakra-ui/react";
import { TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { formatReadableDate } from "../Services/DateRelated";
import { PatchRequest } from "../Services/ApiCall";
import { AdminChangeWithdrawStatus } from "../Redux/Reducers/AdminReducers";
export default function AdminWithdraw() {
  let {docs} = useSelector((state) => state.Admin.WithdrawData)
  console.log(docs)


    return (
      <Box>
        <Flex
          alignItems={["center"]}
          justifyContent={["space-between"]}
          // m={["10px"]}
          flexDir={["column", "column", "row"]}
          bg={"#393E4F"}
          p={["10px"]}
        >
          <Heading textAlign={"start"} color="white">
            Withdraw
          </Heading>
          <InputGroup
            bg={"white"}
            borderRadius={10}
            w={["80%", "60%", "30%"]}
            my={[1, 2, 0]}
          >
            <Input
              focusBorderColor="lime"
              placeholder="Search..."
              _placeholder={{ opacity: 1, color: "black" }}
            />
            <InputRightElement
              pointerEvents="auto"
              cursor={"pointer"}
              children={<SearchIcon color="black" />}
            />
          </InputGroup>
          <Select bg="white" placeholder="Filter" w={["80%", "60%", "20% "]}>
            <option>Pending</option>
            <option>Success</option>
            <option>Failed</option>
            <option>Today days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </Select>
        </Flex>

        <Box p={"10px"}>
          <Flex overflowX="auto">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Amount</Th>
                  <Th>Email</Th>

                  <Th>UPI ID</Th>

                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {docs.map((withdraw, index) => (
                  <WithdrawControler
                    key={index}
                    withdraw={withdraw}
                    index={index}
                  />
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Box>
      </Box>
    );
}





function WithdrawControler({ withdraw, index }) {

  const url = import.meta.env.VITE_API_URL;
  let toast = useToast()
  let dispatch = useDispatch()
     function StatusColor(status) {
       if (status === "Success") {
         return "#61E461"; // Green
       } else if (status === "Failed") {
         return "#FF0000"; // Red
       } else {
         return "#FFAA00"; // Yellow
       }
  }
  
  function ChangeStatus(e) {
    let newStatus = e.target.value
    PatchRequest(`${url}withdraw/`, { _id: withdraw._id, status: newStatus })
      .then((res) => {
        console.log(res)
        if (res.status) {
          dispatch(AdminChangeWithdrawStatus(res.data))
        } else {
          console.log(res)
          toast({
            title: 'Something went wrong',
            description: 'Internal Error',
            status:'error'
          })
        }
      })
      .catch((error) => {
        console.log(error)
         toast({
           title: "Something went wrong",
           description: "Internal Error",
           status:'error'
         });
      })
  }
  
  return (
    <Tr key={index} bg={StatusColor(withdraw.status)}>
      <Td color={"white"} fontSize={{ base: "xs", sm: "sm", md: "md" }}>
        {withdraw.amount}
      </Td>
      <Td color={"white"} fontSize={{ base: "xs", sm: "sm", md: "md" }}>
        {withdraw.email}
      </Td>

      <Td color={"white"} fontSize={{ base: "xs", sm: "sm", md: "md" }}>
        {withdraw.upi_Id}
      </Td>

      <Td color={"white"} fontSize={{ base: "xs", sm: "sm", md: "md" }}>
        {formatReadableDate(withdraw?.createdAt)}{" "}
      </Td>
      <Td>
        <Select defaultValue={withdraw.status} size="xs" onChange={ChangeStatus} >
          <option>Pending</option>
          <option>Success</option>
          <option>Failed</option>
        </Select>
      </Td>
    </Tr>
  );
}