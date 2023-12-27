import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Table,
  Tr,
  Th,
  Select,
  Td,
  TableContainer,
  InputGroup,
  InputRightElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Tbody,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { formatReadableDate } from "../Services/DateRelated";

export default function AdminReports() {
  let toast = useToast();
  const [reports, setReports] = useState([]);
  const [deleting_ids, setDeleting_ids] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    GetAllReport();
  }, []);

  async function GetAllReport() {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}report/all`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReports(result.data);
      })
      .catch((error) => {
        toast({
          title: "something went wrong",
          status: "error",
          duration: 5000,
          description: error,
        });
      });
  }

  function DeleteReports() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    );

    var raw = JSON.stringify({
      deleting_ids: deleting_ids,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}report/delete`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, deleting_ids);
        let new_reports = reports.filter((e) => !deleting_ids.includes(e._id));
        setReports(new_reports);
      })
      .catch((error) => console.log("error", error));
  }

  function filterReport(value) {
    let filterReports;
    if (value == 2) {
      filterReports = reports.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else {
      filterReports = reports.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    setReports([...filterReports]);
  }

  const handleCheckboxChange = (event, report) => {
    const { checked } = event.target;
    const reportId = report._id;

    if (checked) {
      setDeleting_ids([...deleting_ids, reportId]);
    } else {
      const newDeletingIds = deleting_ids.filter((id) => id !== reportId);
      setDeleting_ids(newDeletingIds);
    }
  };

  const ReportBox = ({ report }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openGmailAndSendMessage = (emailAddress, subject) => {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
        subject
      )}`;
      window.open(gmailLink, "_blank");
    };

  
    return (
      <Tr onClick={onOpen} key={report._id} _hover={{ cursor: "pointer" }}>
        <Th w={["30%"]}>
          <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <b>Subject: </b> {report.subject}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <table>
                  <tbody>
                    <tr style={{ width: "100px" }}>
                      <th style={{ textAlign: "left" }}>Report By </th>
                      <td>: {report.name}</td>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "left" }}>Date</th>
                      <td>
                        <Text>: {formatReadableDate(report.createdAt)}</Text>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "left" }}>Mail ID</th>
                      <td>: {report.email}</td>
                    </tr>

                    <tr>
                      <th style={{ textAlign: "left" }}>Report</th>
                      <td>: {report.report}</td>
                    </tr>
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={["3px"]} onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() =>
                    openGmailAndSendMessage(report.email, report.subject)
                  }
                  colorScheme="blue"
                >
                  Reply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Flex>
            <input
              type="checkbox"
              checked={deleting_ids.includes(report._id)}
              onChange={(e) => handleCheckboxChange(e, report)}
            />
            <Text noOfLines={1} ml={["10px"]} onClick={onOpen}>
              {report.subject}
            </Text>
          </Flex>
        </Th>
        <Td>
          <Text noOfLines={1} onClick={onOpen}>{report.report}</Text>
        </Td>
        <Td noOfLines={1} >{formatReadableDate(report.createdAt)}</Td>
      </Tr>
    );
  };

  

  return (
    <Box>
      <Flex
        alignItems={["center"]}
        justifyContent={["space-between"]}
        // m={["2px", "4px", "10px"]}
        flexDir={["column", "column", "row"]}
        bg={"#393E4F"}
        p={["10px"]}
      >
        <Heading color="white" m={[1, 2, 0]}>
          Reports
        </Heading>
        {/* <InputGroup bg={"white"} borderRadius={10}   my={[1, 2, 0]}
          w={["95%", "90%", "30%"]}>
          <Input
            focusBorderColor="lime"
            placeholder="Type Search Words"
            _placeholder={{ opacity: 1, color: "black" }}
          />
          <InputRightElement
            pointerEvents="auto"
            cursor={"pointer"}
            children={<SearchIcon color="black" />}
          />
        </InputGroup> */}
        <Select
          placeholder="Filter"
          my={[1, 2, 0]}
          w={["95%", "90%", "25%"]}
          onChange={(e) => filterReport(e.target.value)}
          bg="white"
        >
          <option value={1}> New Reports First</option>
          <option value={2}> Old Reports First</option>
        </Select>
        <Button
          w={["95%", "90%", "25%"]}
          my={[1, 2, 0]}
          onClick={DeleteReports}
        >
          <Text color="#393E4F" fontWeight={"medium"} mx="5">
            Delete
          </Text>
          <DeleteIcon color={"#393E4F"} _hover={{ cursor: "pointer" }} />
        </Button>
      </Flex>
      {/* container */}
      <Box
        h="90vh"
        overflowY="scroll"
        sx={{
          /* Hide scrollbar */
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Opera
          },
          "&": {
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
          },
        }}
      >
        {/* reports */}
        <TableContainer>
          <Table>
            {/* Report box */}
            <Tbody>
              {reports?.map((report) => {
                return <ReportBox key={report._id} report={report} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
