import {
  Box, Flex, Image, useToast,
  Text, Select, InputGroup, InputRightElement, Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { GetRequest } from "../Services/ApiCall";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AdminSetBlog } from "../Redux/Reducers/AdminReducers";

const BlogCategory = {
  TECHNOLOGY: "Technology",
  TRAVEL: "Travel",
  FASHION: "Fashion",
  FOOD: "Food",
  HEALTH_FITNESS: "Health & Fitness",
  LIFESTYLE: "Lifestyle",
  FINANCE: "Finance",
  EDUCATION: "Education",
  DIY_CRAFTS: "DIY & Crafts",
  ENTERTAINMENT: "Entertainment",
};

export default function Blogs() {
  let url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = useSelector((state) => state.Admin.BlogData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  let { pathname } = useLocation();
  let toast = useToast();
  useEffect(() => {
    fetchBlog();
  }, [selectedCategory, currentPage]);



  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

    function fetchBlog() {
      GetRequest(
        `${url}blog?search=${search}&category=${selectedCategory}&page=${currentPage}`
      )
        .then((res) => {
          if (res.status) {
            dispatch(AdminSetBlog(res));
          } else {
            toast({
              title: "Something went wrong",
              status: "error",
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            description: error.message,
          });
          console.log(error);
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
          href="https://futureiqra.onrender.com/image/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://futureiqra.onrender.com/image/favicon.png"
        />
      </Helmet>

      <Box width={""} minH="100vh">
        <Flex
          bg="#5426c0"
          alignItems={"center"}
          px={["5px", "10px", "20px"]}
          justifyContent={"space-between"}
        >
          <Image
            cursor={"pointer"}
            w={"60px"}
            h="60px"
            src="https://futureiqra.onrender.com/image/favicon.png"
            alt="FutureIQRA"
            onClick={() => navigate("/")}
          />

          <Flex
            // px={"50px"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <InputGroup
              size={["sm", "md", "lg"]}
              bg={"white"}
              borderRadius={10}
              w={["150px", "150px", "200px"]}
              my={[1, 2, 0]}
            >
              <Input
                focusBorderColor="lime"
                placeholder="Search..."
                _placeholder={{ opacity: 1, color: "black" }}
                _hover={{ bg: "white" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputRightElement
                pointerEvents="auto"
                cursor={"pointer"}
                children={<SearchIcon color="black" />}
                onClick={() => fetchBlog()}
              />
            </InputGroup>
            <Box display={["none", "block", "block"]}>
              <BlogCategorySelect
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
            </Box>
          </Flex>
        </Flex>

        <Flex
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          display={["block", "none", "none"]}
          p="10px"
          bg={"#5426c0"}
        >
          <BlogCategorySelect
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
        </Flex>

        <Flex
          justifyContent={"flex-start"}
          m="30px auto"
          gap={"20px"}
          alignItems={"start"}
          flexWrap={"wrap"}
        >
          {docs?.length >= 1 &&
            docs?.map((blog) => {
              return <BlogPost key={blog._id} blog={blog} />;
            })}
        </Flex>
      </Box>
      <Flex alignItems={"center"} justifyContent={"center"} m="10px">
        <button
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className={
            !hasPrevPage
              ? "button-prev button-disabled"
              : "button-prev button-enabled"
          }
          role="button"
        >
          Previous
        </button>
        <button className="button-current button-disabled" role="button">
          1
        </button>
        <button
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
          className={
            !hasNextPage
              ? "button-next button-disabled"
              : "button-next button-enabled"
          }
          role="button"
        >
          Next
        </button>
      </Flex>
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
};


const BlogCategorySelect = ({ value, onChange }) => {
  return (
    <Select
      w="200px"
      size={["sm", "md", "lg"]}
      value={value}
      onChange={onChange}
      bg="white"
      
    >
      <option value="">Select a category</option>
      {Object.values(BlogCategory).map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};