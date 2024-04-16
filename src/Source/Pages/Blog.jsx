import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Blog.css";
import { GetRequest } from "../Services/ApiCall";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { formatReadableDate } from "../Services/DateRelated";

const BlogPost = () => {
    const url = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Get the ID from the URL
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
      // Fetch blog data using the ID
      if (id == "") return;
    GetRequest(`${url}blog/${id}`).then((res) => {
        setBlogData(res.data);
        // console.log(res)
    })
  }, [id]); // Fetch data whenever ID changes

  if (!blogData) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  const { title, body, category, tags, author, short_description, createdAt } =
    blogData;

  return (
    <Flex
      // minH={"-100vh"}
      // alignItems={"start"}
      // justifyContent={"start"}
      flexDir={"column"}
      color="white"
      bg="white"
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={short_description} />

        <link
          rel="shortcut icon"
          type="image/png"
          sizes="512x512"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
      </Helmet>
      <Box width={"100%"} minH="100vh">
        <Flex bg="purple">
          <Image
            cursor={"pointer"}
            w={"60px"}
            h="60px"
            src="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon_io/android-chrome-512x512.png"
            alt="FutureIQRA"
            onClick={() => navitage("/")}
          />
        </Flex>

        <Flex justifyContent={"space-evenly"} flexWrap={"wrap"}>
          <Box
            width={["100%", "100%", "70%"]}
            m={["2px", "4px", "10px"]}
            p={["2px", "4px", "10px"]}
            bg="white"
          >
            <Text
              fontSize={["2xl", "3xl", "4xl"]}
              fontWeight={"extrabold"}
              noOfLines={1}
            >
              {title}
            </Text>
            <Text
              fontFamily={"Roboto"}
              fontSize={["sm"]}
              fontWeight={"hairline"}
            >
              {short_description}
            </Text>
            <Text
              fontFamily={"Roboto"}
              fontSize={["sm", "md", "lg"]}
              fontWeight={"semibold"}
            >
              By: &nbsp;
              <strong>{author?.name}</strong>
            </Text>

            <Text
              fontFamily={"Roboto"}
              fontSize={["sm", "md", "lg"]}
              fontWeight={"semibold"}
            >
              Date: &nbsp;
              <strong>{formatReadableDate(createdAt)}</strong>
            </Text>

            <Box
              fontFamily={"Roboto"}
              fontSize={["sm", "md", "lg"]}
              dangerouslySetInnerHTML={{ __html: body }}
            ></Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BlogPost;
