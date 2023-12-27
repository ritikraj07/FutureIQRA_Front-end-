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
import VideoPlayer from "../../Components/VideoPlayer";
import TextEditor from "./TextEditor";
import { PostRequest } from "../../Services/ApiCall";

export default function AddVideo({ course }) {
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video, setVideo] = useState({});
  const toast = useToast()

    const handleEditorChange = (newContent) => {
      setVideo({ ...video, notes: newContent });
    };

  function InputHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    setVideo({ ...video, [name]: value });
  }

  function AddVideo(e) {
    e.preventDefault()
  
    PostRequest(`${url}course/add-video`, { ...video, course_id: course._id }).then(
      (res) => {
        if (res.status) {
          toast({
            title: "Video Added Successfully",
            status: "success",
            duration: 3000,
          });
          // onClose();
        } else {
          toast({
            title: "something went wrong",
            status: "error",
            duration: 3000,
            description: res.message,
          });
        }
      }
    );
  }

  const handleTest = () => {
    window.open("https://dailymotionvideotesting.netlify.app/", "_blank");
  };

  return (
    <>
      <Button onClick={onOpen} w={"100%"} colorScheme="purple">
        Add Video
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"95%"}>
          <ModalHeader>Add New Video: {course.name}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => AddVideo(e)}>
            <ModalBody>
              <Flex justifyContent={"space-between"}>
                <Stack w="100%">
                  <FormLabel>Video Title</FormLabel>
                  <Input required onChange={(e) => InputHandle(e)} name="title" />

                  <FormLabel>Video ID</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={"https://dai.ly/"} />
                    <Input
                      onChange={(e) => InputHandle(e)}
                      name="url"
                      required
                    />
                    <InputRightAddon
                      color="purple"
                      _hover={{ cursor: "pointer" }}
                      children={"Test Here"}
                      onClick={handleTest}
                    />
                  </InputGroup>
                </Stack>
                <Box
                  p={"4"}
                  width={["40%"]}
                  display={["none", "none", "none", "block"]}
                >
                  <VideoPlayer videoId={video.url?video.url:course.intro} />
                </Box>
              </Flex>

              <FormLabel>Description</FormLabel>
              <Textarea required onChange={(e) => InputHandle(e)} name="description" />

              <FormLabel>Notes</FormLabel>
              <TextEditor
                placeholder={"start typing..."}
                setContent={handleEditorChange}
                content={video.notes}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue">
                Add Video
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
