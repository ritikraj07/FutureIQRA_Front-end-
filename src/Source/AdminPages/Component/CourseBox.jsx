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
import VideoPlayer from "../../Components/VideoPlayer";
import AddVideo from "./AddVideo";
import EditCourse from "./EditCourse";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "./ConfirmBtm";
import { DeleteRequest } from "../../Services/ApiCall";
import DeleteVideo from "./DeleteVideo";


export default function CourseBox({ course, ResetCourse}) {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  let { name, price, description, instructor, discount, intro, _id } = course;
  const toast = useToast();
  function DeleteCourse() {
    DeleteRequest(`${url}course/id/${course._id}`).then((res) => {
      if (res.status) {
        toast({
          title: "Delete Successfully",
          duration: 3000,
          status: "success",
        });
        ResetCourse(course._id)
      } else {
        toast({
          titil: res.message,
          duration: 3000,
          status: "error",
        });
      }
    });
  }

  

  return (
    <Box
      height={"fit-content"}
      maxW={"350px"}
      width={"300px"}
      m={2}
      p={2}
      borderRadius={5}
      boxShadow={
        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"
      }
    >
      <Box w={["100%"]}>
        <VideoPlayer videoId={intro} />
      </Box>
      <Box>
        <Text noOfLines={2} lineHeight={1.3} my={1} fontSize={"medium"}>
          {name}
        </Text>
        <Text
          color={"gray"}
          noOfLines={1}
          fontWeight={"semibold"}
          fontSize={"small"}
        >
          {instructor.name}
        </Text>
        <Text color={"black"}>Price ₹{price}</Text>
      </Box>

      <Stack spacing={1} my={3}>
        <AddVideo course={course} />
        {/* <Button onClick={()=>navigate(`/admin/course/${name}/${_id}`)} >Add Video</Button> */}
        <DeleteVideo course={course} />
        <EditCourse course_={course} />
        <ConfirmBtn
          title="Delete"
          func={DeleteCourse}
          bg={"red"}
          color="white"
        />
      </Stack>
    </Box>
  );
}