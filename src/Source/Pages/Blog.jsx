import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../Styles/blog.css";
import { GetRequest } from "../Services/ApiCall";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { formatReadableDate } from "../Services/DateRelated";

const BlogPost = () => {
    const url = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Get the ID from the URL
  const [blogData, setBlogData] = useState(null);
  const [relatedBlog, setRelatedBlog] = useState([]);

  useEffect(() => {
      // Fetch blog data using the ID
      if (id == "") return;
    GetRequest(`${url}blog/${id}`).then((res) => {
      if (res.status) {
        setBlogData(res.data.blog);
        setRelatedBlog(res.data.relatedBlogs);
      } else {
        console.log(res)
        
      }
      
    })
  }, [id]); // Fetch data whenever ID changes

  if (!blogData) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  const { title, body, category, tags, author, short_description, createdAt } =
    blogData;

  return (
    <Flex
      flexDirection={"column"}
      color="black"
      bg="#f9f9f9"
      minHeight="100vh"
      fontFamily="Roboto, sans-serif"
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={short_description} />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="512x512"
          href="https://futureiqra.onrender.com/image/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://futureiqra.onrender.com/image/favicon.png"
        />
      </Helmet>
      <Box width={"100%"} minHeight="100vh">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="#5426c0"
          p="10px"
          mb="20px"
        >
          <Image
            cursor={"pointer"}
            w={"60px"}
            h="60px"
            borderRadius={"50%"}
            src="https://futureiqra.onrender.com/image/icon.png"
            alt="FutureIQRA"
            onClick={() => navigate("/")}
          />

          <Link to="/blogs">
            <Text color="white">More Blogs...</Text>{" "}
          </Link>
        </Flex>
        <Flex flexDir={["column", "row", "row"]}>
          <Box mx="20px" my="10px" w={["90%", "80%", "70%"]}>
            <Heading
              fontWeight="bold"
              color="#5426c0"
              fontFamily={"Roboto slab, serif"}
            >
              {title}
            </Heading>
            <Text
              fontSize={["12px"]}
              mb="10px"
              fontWeight="hairline"
              color="black"
            >
              {short_description}
            </Text>
            <Text fontSize={["sm"]} fontWeight="semibold">
              By: <strong>{author?.name}</strong>
            </Text>
            <Text fontSize={["sm"]} fontWeight="semibold">
              Date: <strong>{formatReadableDate(createdAt)}</strong>
            </Text>
            <Box my="20px" bg="#5426c0" height="5px" />
            <Box
              fontSize={["sm", "md", "lg"]}
              color="#333"
              fontFamily={"Roboto"}
              // fontWeight="light"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </Box>

          {/* related blogs */}
          <Box>
            {relatedBlog?.map((blog) => {
              return (
                <Box
                  w={["90%", "250px"]}
                  p="10px"
                  borderRadius="10px"
                  bg="blackAlpha.200"
                  key={blog._id}
                  margin="20px"
                  cursor="pointer"
                  h={"250px"}
                  overflow={"hidden"}
                >
                  <Link
                    to={`/blog/${blog._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Text
                      color="#5426c0"
                      fontWeight="bold"
                      fontSize="xl"
                      marginBottom="10px"
                    >
                      {blog.title}
                    </Text>

                    <Box
                      overflow={"hidden"}
                      h={"150px"}
                      //   dangerouslySetInnerHTML={{ __html: blog.body }}
                    >
                      <Text
                        fontSize="sm"
                        noOfLines={4}
                        fontFamily={"Roboto"}
                        fontWeight={"light"}
                      >
                        {" "}
                        {blog.short_description}
                      </Text>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BlogPost;
