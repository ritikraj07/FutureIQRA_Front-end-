import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Table,
  useToast,
  Th,
  Select,
  Td,
  TableContainer,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  TagLabel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
  NumberInput,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Badge,
  InputLeftElement,
  AspectRatio,
} from "@chakra-ui/react";
import TextEditor from "./Component/TextEditor";
import { PostRequest } from "../Services/ApiCall";

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

const WriteBlog = () => {
  const url = import.meta.env.VITE_API_URL;
  const [content, setContent] = useState();
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [short_description, set_short_description] = useState("");
  const [tags, setTags] = useState([]);
  const toast = useToast();
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    PostRequest(`${url}blog/create`, {
      body: content,
      title,
      category: selectedCategory,
      tags, short_description
    })
      .then((res) => {
        if (res.status) {
          toast({
            title: res.message,
            status: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: res.message,
            status: "error",
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
        });
        console.log(error);
      });
  };
  return (
    <Box>
      <Heading textAlign={"center"}> Write Blog</Heading>
      <form
        onSubmit={handlePublish}
        // action={`${url}upload`}
        // enctype="multipart/form-data" method="post"
      >
        <Box p={10}>
          <Stack gap={10}>
            <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Title of blog</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </InputGroup>

            {/* <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Blog Cover Image</FormLabel>
              <Input
                type="file"
                name="image"
                placeholder="Enter image"
                required
                accept="image/*"
                onChange={handleImageChange}
              />
            </InputGroup> */}

            <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Short Description</FormLabel>
              <Input type="text" onChange={(e) => set_short_description(e.target.value)} />
            </InputGroup>

            <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Body of blog</FormLabel>
              <TextEditor setContent={setContent} content={content} />
            </InputGroup>

            <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Select Category of Blog</FormLabel>
              <BlogCategorySelect
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
            </InputGroup>

            <InputGroup display={"flex"} flexDirection={"column"}>
              <FormLabel>Blog Tags</FormLabel>
              <TagInput tags={tags} onChange={handleTagsChange} />
            </InputGroup>
          </Stack>
        </Box>
        <Box
          p={10}
          mb="50px"
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Button colorScheme="teal" type="submit">
            Publish
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const BlogCategorySelect = ({ value, onChange }) => {
  return (
    <Select required value={value} onChange={onChange}>
      <option value="">Select a category</option>
      {Object.values(BlogCategory).map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
};

const TagInput = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue.trim());
      setInputValue("");
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <Box>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Enter tags (press Enter or comma to add)"
      />
      <Box w="100%" my="5">
        {tags.map((tag) => (
          <Box
            key={tag}
            style={{
              margin: "5px",
              border: "1px solid black",
              borderRadius: "5px",

              display: "inline-flex",
              alignItems: "center",
            }}
            px="3"
          >
            <Text>{tag}</Text>
            <Button
              m="0"
              p={0}
              _hover={{ bg: "transparent" }}
              color="teal"
              bg="transparent"
              onClick={() => removeTag(tag)}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WriteBlog;
