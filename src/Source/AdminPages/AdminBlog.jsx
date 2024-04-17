import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Td,
  Tr,
  Tbody,
  Table,
  Th,
  useToast,
    Thead,
    Tooltip
} from "@chakra-ui/react";

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


import { FaPenNib } from "react-icons/fa";
import { TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRequest, GetRequest } from "../Services/ApiCall";
import { AdminSetBlog } from "../Redux/Reducers/AdminReducers";
const AdminBlog = () => {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setPage] = useState(1);
  const [search, setSearch] = useState("")
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
  
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchBlog()
  },[selectedCategory, currentPage])


    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };

  
  function fetchBlog() {
    GetRequest(`${url}blog?search=${search}&category=${selectedCategory}&page=${currentPage}`)
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

 

  

  const handlePageChange = (page) => {
    setPage(page);
    
  };

  
  function DeleteBlog(id) {
    DeleteRequest(`${url}blog/${id}`).then((res) => {
      if (res.status) {
        toast({
          title: "Blog Deleted Successfully",
          status: "success",
          duration: 3000,
        });
        fetchBlog();
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
        });
      }
    })
  }






    return (
      <Box>
        <Flex
          alignItems={["center"]}
          justifyContent={["space-between"]}
          // m={["10px"]}
          flexDir={["column", "row", "row"]}
          bg={"purple"}
          p={["10px"]}
          px={["20px"]}
          pos="relative"
        >
          <Heading textAlign={"start"} color="white">
            Blog
          </Heading>

          <Tooltip label="Write Blog">
            <span
              tabIndex={0}
              focusable
              onClick={() => {
                navigate("/admin/write_blog");
              }}
              style={{ cursor: "pointer", position:'absolute', top:'25px', right:'10px' }}
            >
              <FaPenNib color="white" />
            </span>
          </Tooltip>
        </Flex>
        {/* filters and sort */}

        <Flex w="100%" justifyContent={"space-around"} my="10px" alignItems={"center"} flexDir={["column", "column", "row"]} >
          <InputGroup
            bg={"white"}
            borderRadius={10}
            w={["80%", "60%", "30%"]}
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
          {docs?.map((blog) => {
            return <BlogPost blog={blog} key={blog._id} DeleteBlog={DeleteBlog}  />;
          })}
        </Flex>

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





const BlogPost = ({ blog, DeleteBlog }) => {
  const navigate = useNavigate()
  return (

    <Box
      w="250px"
      p="10px"
      borderRadius="10px"
      bg="blackAlpha.200"
      key={blog._id}
      margin="20px"
      cursor="pointer"
      overflow={"hidden"}
    >
      <Box h="200px" >
        <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
          <Text fontWeight="bold" fontSize="xl" marginBottom="10px">
            {blog.title}
          </Text>
          <Box>
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

      <Flex justifyContent={"space-between"} mt="10px" w="100%" alignItems={"center"}>
        <Button onClick={() => DeleteBlog(blog._id)} colorScheme="red" >Delete</Button>
        <Button onClick={() => navigate(`/admin/edit_blog/${blog._id}`)} colorScheme="blue" >Edit</Button>
      </Flex>
    </Box>
  );
};


const BlogCategorySelect = ({ value, onChange }) => {
  return (
    <Select w="200px" required value={value} onChange={onChange}>
      <option value="">Select a category</option>
      {Object.values(BlogCategory).map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};



export default AdminBlog