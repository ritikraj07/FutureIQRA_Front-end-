import { useEffect, useState } from "react";
import "../Styles/paginationButton.css";
import {
  Box,
  Flex,
  Heading,
  Select,
  Td,
  Tr,
  Tbody,
  Table,
  Th,
  useToast,
  Thead,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { formatReadableDate } from "../Services/DateRelated";
import { GetRequest, PatchRequest } from "../Services/ApiCall";
import {
  AdminChangeWithdrawStatus,
  AdminSetWithDraw,
} from "../Redux/Reducers/AdminReducers";
export default function AdminWithdraw() {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const dispatch = useDispatch();
  const [day, setDay] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [status, setStatus] = useState("");
  let {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = useSelector((state) => state.Admin.WithdrawData);

  function fetchData(status, day, page) {
    GetRequest(`${url}withdraw?status=${status}&days=${day}&page=${page}`)
      .then((res) => {
        if (res.status) {
          dispatch(AdminSetWithDraw(res));
        } else {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
          description: error.message,
        });
        console.log(error);
      });
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    fetchData(e.target.value, day, 1);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    fetchData(status, e.target.value, 1);
  };

  const handlePageChange = (page) => {
    setPage(page);
    fetchData(status, day, page);
  };
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

        <Select
          bg="white"
          onChange={handleStatusChange}
          placeholder="Status"
          w={["80%", "60%", "20% "]}
          my={["10px"]}
        >
          <option>Pending</option>
          <option>Success</option>
          <option>Failed</option>
        </Select>

        <Select
          bg="white"
          onChange={handleDayChange}
          placeholder="Days"
          w={["80%", "60%", "20% "]}
          defaultValue={10000}
        >
          <option value={1}>Today days</option>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
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

      <Flex alignItems={"center"} justifyContent={"center"}>
        <button
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className={
            !hasPrevPage
              ? "button-prev button-disabled"
              : "button-prev button-enabled"
          }
          role="button"
        >
          Previous
        </button>
        <button className="button-current button-disabled" role="button">
          1
        </button>
        <button
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
          className={
            !hasNextPage
              ? "button-next button-disabled"
              : "button-next button-enabled"
          }
          role="button"
        >
          Next
        </button>
      </Flex>
    </Box>
  );
}

function WithdrawControler({ withdraw, index }) {
  const url = import.meta.env.VITE_API_URL;
  let toast = useToast();
  let dispatch = useDispatch();
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
    let newStatus = e.target.value;
    PatchRequest(`${url}withdraw/`, { _id: withdraw._id, status: newStatus })
      .then((res) => {
        // console.log(res)
        if (res.status) {
          dispatch(AdminChangeWithdrawStatus(res.data));
        } else {
          console.log(res);
          toast({
            title: "Something went wrong",
            description: "Internal Error",
            status: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Something went wrong",
          description: "Internal Error",
          status: "error",
        });
      });
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
        <Select
          defaultValue={withdraw.status}
          size="xs"
          onChange={ChangeStatus}
        >
          <option>Pending</option>
          <option>Success</option>
          <option>Failed</option>
        </Select>
      </Td>
    </Tr>
  );
}
