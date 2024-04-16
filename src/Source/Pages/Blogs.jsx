import { Box, Flex, Image, useToast, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { GetRequest } from "../Services/ApiCall";
import { Link, useLocation } from "react-router-dom";
export default function Blogs() {
  let url = import.meta.env.VITE_API_URL;
    let [blogs, setBlogs] = useState([]);
    let { pathname } = useLocation();
  let toast = useToast();
  useEffect(() => {
    GetBlog();
  }, []);
    
    let blogURL = `${url}blog`;

    function GetBlog() {
         GetRequest(`${url}blog`).then((res) => {
           if (res.status) {
             setBlogs(res.data);
           } else {
             console.log(res);
             toast({
               title: "Something went wrong",
               status: "error",
               duration: 3000,
             });
           }
         });
    }

  return (
    <Box bg="white">
      <Helmet>
        <title>Future IQRA</title>
        <meta
          name="description"
          content="Unlock your potential with our Professional Skill Development Program. Join us for career growth and navigate daily life effortlessly with insightful Life Hack Tips and Tricks."
        />

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

        <Flex justifyContent={"flex-start"} m="30px auto" gap={'20px'} alignItems={"start"} flexWrap={"wrap"}>
          {blogs.map((blog) => {
            return <BlogPost key={blog._id} blog={blog} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
}

const BlogPost = ({ blog }) => {
  

  return (
    <Box
      w="250px"
      p="10px"
      borderRadius="10px"
      bg="blackAlpha.200"
      key={blog._id}
      margin="20px"
      cursor="pointer"
      h={"250px"}
      overflow={"hidden"}
    >
      <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
        <Text fontWeight="bold" fontSize="xl" marginBottom="10px">
          {blog.title}
        </Text>
        
        <Box
          overflow={"hidden"}
          h={"150px"}
        //   dangerouslySetInnerHTML={{ __html: blog.body }}
              >
                  <Text fontSize="sm" noOfLines={4} fontFamily={"Roboto"} fontWeight={"light"} > {blog.short_description}</Text>
        </Box>
      </Link>
    </Box>
  );
};
