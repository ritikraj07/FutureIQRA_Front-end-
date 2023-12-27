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
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { GetRequest, PostRequest } from "../Services/ApiCall";
import CreateCourse from "./Component/CreateCouse";
import VideoPlayer from "../Components/VideoPlayer";
import CourseBox from "./Component/CourseBox";
export default function AdminCourse() {
  const url = import.meta.env.VITE_API_URL;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    GetRequest(`${url}course/all`).then((res) => {
      // console.log(res);
      if (res.status) {
        setCourses(res.data);
      }
    });
  }, []);

  function ResetCourse(id) {
    let newData = courses?.filter((course) => course._id != id)
    setCourses([...newData])
 }

  return (
    <Box>
      <Flex
        alignItems={["center"]}
        justifyContent={["space-between"]}
        // m={["2px", "4px", "10px"]}
        flexDir={["column", "column", "row"]}
        bg={"#393E4F"}
        p={["2px", "4px", "10px"]}
      >
        <Heading color="white" m={[1, 2, 0]}>
          Course
        </Heading>
        <InputGroup
          bg={"white"}
          borderRadius={10}
          my={[1, 2, 0]}
          w={["95%", "90%", "30%"]}
        >
          <Input
            focusBorderColor="lime"
            placeholder="Type Search Words"
            onChange={(e) => {}}
            _placeholder={{ opacity: 1, color: "black" }}
            // onKeyDown={handleKeyDown}
          />
          <InputRightElement
            pointerEvents="auto"
            cursor={"pointer"}
            children={<SearchIcon color="black" />}
            // onClick={SearchQuestion}
          />
        </InputGroup>
        <CreateCourse />
      </Flex>

      <Flex
        gap={"10px"}
        justifyContent={["center", "center", "space-around"]}
        
        flexWrap={"wrap"}
        // border={"1px solid green"}
        h="90vh" // Set height to full viewport height
        overflowY="scroll" // Enable vertical scrollbar
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
        {courses?.map((course) => {
          return <CourseBox key={course._id} course={course} ResetCourse={ResetCourse} />;
        })}
      </Flex>
    </Box>
  );
}
