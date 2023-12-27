import {useState, useEffect} from 'react'
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Link
} from "@chakra-ui/react";
import CourseTemplate from "../Components/CourseTemplate";
import { useSelector } from "react-redux";
import { GetRequest } from '../Services/ApiCall';

export default function MyLearning() {
    const url = import.meta.env.VITE_API_URL;
    const {userType } = useSelector((state) => state.User);    
    const navigate = useNavigate()

    let [courses, setCourses] = useState([]);
    const toast = useToast()

    //  if (userType != "VIP1" || userType != "VIP2") {
    //    navigate("/unauthorized");
    //  }


      useEffect(() => {
        GetRequest(`${url}course/search?coursetype=${userType}`).then((res) => {
          if (res.status) {
              setCourses(res.data);
            //   console.log(res.data)
          } else {
            toast({
              title: "something went wrong",
              status: "error",
            });
          }
        });
        // console.log(courses)
      }, [userType]);

  

  

const NoContentBox = () => {
  return (
    <Box textAlign="center" p="2rem">
      <Heading as="h2" fontSize="xl" mb="1rem">
        You might not be seeing any content for these reasons:
      </Heading>
      <Box textAlign="left" maxW="400px" mx="auto">
        <Text mb="1rem">
          1. You may not have purchased any subscription.
        </Text>
        <Text mb="1rem">
          2. There might be a data fetching issue.
        </Text>
        <Text mb="1rem">
          3. If you've subscribed and still facing issues, please{' '}
          <Link color="blue.500">contact us</Link>.
        </Text>
      </Box>
    </Box>
  );
};



  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="blue.500"
        color="white"
        position="fixed"
        width="100%"
        zIndex="999"
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={()=>navigate('/')} >Home</BreadcrumbLink>
          </BreadcrumbItem>

       

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink >My Learning</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text onClick={() => navigate("/q&a")} as={"button"}>
          Ask Us ?
        </Text>
      </Flex>
      <Box mt={"100px"}>
        <Flex
          my={"50px"}
          gap={"10px"}
          justifyContent={["center", "center", "space-around"]}
          flexWrap={"wrap"}
        >
          {courses?.map((course) => {
            return <CourseTemplate key={course._id} course={course} watch={true} />;
          })}

          {courses.length == 0 && (
            <NoContentBox />
          )}
        </Flex>
      </Box>
    </Box>
  );
}
