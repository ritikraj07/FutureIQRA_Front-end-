import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  useToast,
  Flex,
  Button,
} from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourse } from "../Redux/Reducers/CourseReducers";

export default function CourseTemplate({ course, watch = false }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userType } = useSelector((store) => store.User);
  function extractMonthAndYear(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    const monthYear = date.toLocaleDateString("en-US", options);
    return monthYear;
  }
  function Navigation() {
    dispatch(setCourse(course))
    navigate(`/my-learning/${course.name}/${course._id}/0`)
  }
  return (
    <Flex
      userSelect={"none"}
      key={course._id}
      borderBottom={"1px solid black"}
      height={"fit-content"}
      // maxW={"300px"}
      // width={"300px"}
      flexDir={["column", "column", "row", "row"]}
      w={"95%"}
      // h={"250px"}
      m={2}
      p={2}
      // bg={"rgba(184, 230, 250, 0.2)"}
      borderRadius={5}
      boxShadow={
        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"
      }
    >
      <Box
        // border={"1px solid red"}
        my={"auto"}
        w={["100%", "100%", "50%", "35%"]}
      >
        <VideoPlayer videoId={course.intro} />
      </Box>

      <Box
        m={"10px"}
        w={["100%", "100%", "50%", "70%"]}
        pr={["0%", "0%", "5%", "20%"]}
        h={"100%"}
        // border={"1px solid red"}
      >
        <Text noOfLines={2} lineHeight={1.3} my={1} fontSize={["2xl"]}>
          {course?.name}
        </Text>
        <Text
          color={"purple"}
          noOfLines={1}
          fontWeight={"semibold"}
          fontSize={"small"}
        >
          By {course?.instructor?.name}
        </Text>
        <Text
          color={"black"}
          noOfLines={3}
          fontWeight={"light"}
          fontSize={"sm"}
        >
          {course?.description}
        </Text>
        <Flex alignItems={"center"}>
          <Text
            mr={"10px"}
            fontSize={["small"]}
            mt={"3px"}
            fontWeight={["normal"]}
          >
            Updated
          </Text>
          <UnorderedList display="flex" alignItems={"center"} ml={0}>
            <ListItem noOfLines={1} margin="0px 10px">
              <Text color={"teal"} fontSize={["xs"]}>
                {extractMonthAndYear(course?.updatedAt)}
              </Text>
            </ListItem>
            <ListItem noOfLines={1} margin="0px 10px">
              <Text fontSize={["small"]} color={"green"}>
                {course?.duration} total hour{" "}
              </Text>
            </ListItem>
            <ListItem noOfLines={1} margin="0px 10px">
              <Text fontSize={["small"]} color={"messenger.900"}>
                {course?.video?.length ? course.video.length : 0} lectures
              </Text>
            </ListItem>
          </UnorderedList>
        </Flex>

        {!watch || userType == course.coursetype ? (
          <Flex alignItems={"center"} fontSize={"large"}>
            <Text mr={"15px"}>
              ₹{(course?.discount * course?.price) / 100}{" "}
            </Text>
            <Text as={"del"} color={"grey"}>
              ₹{course?.price}
            </Text>
          </Flex>
        ) : (
          <Button
            color={"white"}
            bg="blue.400"
            _hover={{ bg: "rgb(28,29,31)", color: "blue.400" }}
            onClick={Navigation}
          >
            Start Learning
          </Button>
        )}
      </Box>
    </Flex>
  );
}
