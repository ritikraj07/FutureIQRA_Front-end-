import { useState, useEffect } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { FaFileVideo } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../Services/ApiCall";
import VideoPlayer from "../Components/VideoPlayer";
import { setCourse } from "../Redux/Reducers/CourseReducers";
import ErrorBox from "../Components/ErrorBox.jsx";

export default function WatchCourse() {
  const url = import.meta.env.VITE_API_URL;

  const { course_id, video_no, course_name } = useParams();
  const { userType } = useSelector((state) => state.User);
  const { name, videos, intro } = useSelector((state) => state.Course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // if (videos.length > 0) {
  //     setVideo(videos[0])
  // }

  // add video number in params
  // reset video number on change video

  // console.log(videos[video_no]?.url);

  useEffect(() => {
    GetRequest(`${url}course/search?id=${course_id}`).then((res) => {
      if (res.status) {
        console.log(res.data);
        dispatch(setCourse(res.data));
      } else {
        toast({
          title: "something went wrong",
          status: "error",
        });
      }
    });
    // console.log(courses)
  }, [userType]);

  function CourseContent() {
    return videos?.map((video, i) => {
      return (
        <Box
          key={video._id}
          cursor={"pointer"}
          w={"100%"}
          p={["10px"]}
          borderBottom={"1px solid grey"}
          onClick={() => {
            navigate(`/my-learning/${course_name}/${course_id}/${i}`);
          }}
        >
          <Text color={i==video_no?'blue.500':'black'} fontWeight={i==video_no?"semibold" :"normal"} noOfLines={1}>
            {i + 1}
            {". "}
            {video.title}
          </Text>
        </Box>
      );
    });
  }

  return (
    <Box>
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
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink noOfLines={1} onClick={() => navigate("/")}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              noOfLines={1}
              onClick={() => navigate("/my-learning")}
            >
              My Learning
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem
            display={["none", "none", "none", "block"]}
            isCurrentPage
          >
            <BreadcrumbLink noOfLines={1}>{course_name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text
          color={"white"}
          noOfLines={1}
          onClick={() => navigate("/q&a")}
          cursor={"pointer"}
          textAlign={"right"}
        >
          Ask Us ?
        </Text>
      </Flex>
      <Text
        display={["block", "block", "block", "none"]}
        textAlign={"center"}
        color={"white"}
        bg={"black"}
        noOfLines={1}
      >
        {course_name}
      </Text>
      {videos[video_no]?.url ? (
        <Flex
          // border={'2px solid red'}

          height={"110vh"}
        >
          <Box
            // border={'1px solid green'}
            // w={["70%"]}
            w={["100%", "100%", "100%", "70%"]}
            // p={["0px",'0px','0px', "10px"]}
            // mb={["100px"]}
            // h="100%"

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
            <VideoPlayer videoId={videos[video_no]?.url} />

            <Box p={"10px"}>
              <Text>{videos[video_no].title}</Text>
            </Box>

            <Tabs variant="enclosed">
              <TabList>
                <Tab>Description</Tab>
                <Tab>Notes</Tab>

                <Tab
                  noOfLines={1}
                  display={["block", "block", "block", "none"]}
                >
                  <Text
                    display={["none", "block",]}
                    fontWeight={"normal"}
                  >
                    Course Contents
                  </Text>
                  <Text display={["block", "none"]}>
                    <FaFileVideo />
                  </Text>
                </Tab>

                <Tab>Reviews</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>{videos[video_no]?.description}</Box>
                </TabPanel>

                <TabPanel>
                  <Box
                    // border={"1px solid red"}
                    px={["5px", "40px"]}
                    dangerouslySetInnerHTML={{
                      __html: videos[video_no]?.notes,
                    }}
                  />
                </TabPanel>

                <TabPanel>
                  <Box display={["block", "block", "block", "none"]}>
                    <CourseContent />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Text>We are working on it...</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box
            w={["0%", "0%", "0%", "30%"]}
            // w={["95%", "90%", "90%", "70%"]}
            minH={"110vh"}
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
            display={["none", "none", "block"]}
          >
            {/* course titile */}
            <CourseContent />
          </Box>
        </Flex>
      ) : (
        <ErrorBox />
      )}
    </Box>
  );
}
