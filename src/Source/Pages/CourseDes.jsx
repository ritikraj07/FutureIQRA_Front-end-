import { useEffect, useRef, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

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
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { GetRequest } from "../Services/ApiCall";
import CourseTemplate from "../Components/CourseTemplate";
import Vip1Course from "../Components/VIP1Course";
import Vip2Course from "../Components/VIP2Course";
export default function CourseDes() {
  const url = import.meta.env.VITE_API_URL;
  let { coursetype } = useParams();
  const navigate = useNavigate();
  let [courses, setCourses] = useState([]);
  let toast = useToast();
  // console.log(Course_id);
  if (coursetype != 'vip1' && coursetype != 'vip2') {
    navigate("/unauthorized");
  }

  useEffect(() => {
    GetRequest(`${url}course/search?coursetype=${coursetype}`).then((res) => {
      // console.log("===>", res);
      if (res.status) {
        setCourses(res.data);
      } else {
        toast({
          title: "something went wrong",
          status: "error",
        });
      }
    });
    // console.log(courses)
  }, []);

  return (
    <Box userSelect={"none"} bg="white" >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="blue.500"
        color="white"
        // position="fixed"
        width="100%"
        zIndex="999"
      >
        <Heading>
          Future IQAR
          <span style={{ color: "gold", marginLeft: "10px" }}>
            {coursetype == "vip1" ? "VIP1" : "VIP2"}
          </span>
        </Heading>
        <Text onClick={() => navigate("/q&a")} as={"button"}>
          Ask Us ?
        </Text>
      </Flex>
      {/* <Box
        pos={"relative"}
        w={["100%"]}
        height={["40vh", "50vh", "60vh"]}
        backgroundImage={
          "https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR6WK7gAVzTJFqb5yg5NAULQp_vO6o3bC62RUjfq-iIGjFBgMurRsTxb3r4R2QQ4upP8IB7XPmv9qUtPGNWEOwuvUMfBw=w1920-h907"
        }
        backgroundRepeat={"repeat-x"}
      >
        <Box
          pos={"absolute"}
          p={["10px"]}
          left={["10", "50", "100"]}
          top={["10", "50", "100"]}
          borderRadius={"5px"}
          bg={"white"}
          boxShadow={
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
          }
          w={["80%", "50%", "30%"]}
        >
          <Heading fontFamily={"cursive"} size={"lg"}>
            Always Remember!
          </Heading>
          <Text mt={"3"} fontWeight={"light"}>
            “Education is the most powerful weapon which you can use to change
            the world.”{" "}
          </Text>
          <Text>Join us now!</Text>
        </Box>
      </Box> */}
      <Flex
        my={"50px"}
        gap={"10px"}
        justifyContent={["center", "center", "space-around"]}
        flexWrap={"wrap"}
      >
        {courses?.map((course) => {
          return <CourseTemplate key={course._id} course={course} />;
        })}

        {courses?.length == 0 && (
          <Box>
            <Heading color={"black"}>Comming Soon..</Heading>
          </Box>
        )}
      </Flex>
      {/*  */}
      {coursetype == "vip1" ? <Vip1Course /> : <Vip2Course />}

      {/* copy right */}
    </Box>
  );
}
