import { useEffect, useRef, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

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
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { GetRequest } from "../Services/ApiCall";
import CourseTemplate from "../Components/CourseTemplate";
import Vip1Course from "../Components/VIP1Course";
import Vip2Course from "../Components/VIP2Course";
import { useSelector } from "react-redux";
import { SearchIcon } from "@chakra-ui/icons";
export default function CourseDes() {
  const url = import.meta.env.VITE_API_URL;
  let { coursetype } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('')
  let [courses, setCourses] = useState([]);
  let toast = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeout);

      // Hide the button after 5 seconds of inactivity
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

   const handleKeyDown = (e) => {
     // Check if the Enter key is pressed (key code 13)
     if (e.key === "Enter") {
       // Call your function here, e.g., searchFunction()
       SearchCourse()
     }
  };
  
  function SearchCourse() {
    if (query.length == 0) return;
    
    GetRequest(
      `${url}course/search?name=${query}&coursetype=${coursetype}`
    ).then((res) => {
      if (res.status) {
        if (res.data.length > 0) {
          setCourses(res.data);
        } else {
          toast({
            title: "No course found",
            status: "info",
          });
        }
      } else {
        toast({
          title: "something went wrong",
          status: "error",
        });
      }
    });
  }

  function CourseDes() {
    const element = document.getElementById("couserDescription");
    element.scrollIntoView();
  }
   const buttonStyle = {
     position: "fixed",
     bottom: "50px",
     right: "10%",

     zIndex: "1000",
     display: isVisible ? "block" : "none",
     transition: "opacity 1s ease-in-out",
     opacity: isVisible ? "1" : "0",
   };
  return (
    <Flex flexDirection={['column']} justifyContent={'space-between'} minH={"100vh"} userSelect={"none"} bg="white">
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
          {/* Future IQAR */}
          <span style={{ color: "gold", marginLeft: "10px" }}>
            {coursetype == "vip1" ? "VIP1" : "VIP2"}
          </span>
        </Heading>

        <InputGroup
          bg={"white"}
          borderRadius={10}
          my={[1, 2, 0]}
          w={["50%","30%"]}
        >
          <Input
            focusBorderColor="lime"
            placeholder="Search Course"
            onChange={(e) =>{setQuery(e.target.value)}}
            _placeholder={{ opacity: 1, color: "grey" }}
            onKeyDown={handleKeyDown}
            color={'black'}
          />
          <InputRightAddon
            pointerEvents="auto"
            cursor={"pointer"}
            children={<SearchIcon color="black" />}
            onClick={SearchCourse}
          />
        </InputGroup>

        {/* <Text onClick={() => navigate("/q&a")} as={"button"}>
          Ask Us ?
        </Text> */}
      </Flex>
     {courses?.length !=0 && <Button
        bg={"blue.500"}
        color={"white"}
        style={buttonStyle}
        onClick={CourseDes}
      >
        Enroll Now
      </Button>}
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
      <Box id="couserDescription" w={"100%"}>
        {coursetype == "vip1" ? <Vip1Course /> : <Vip2Course />}
      </Box>

      
    </Flex>
  );
}
