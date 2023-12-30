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
import { PatchRequest, PostRequest } from "../../Services/ApiCall";
import { MdModeEdit } from "react-icons/md";



export default function EditVideo({ course, videos, index, setVideos }) {
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video, setVideo] = useState(videos[index]);

  const toast = useToast();

  const handleEditorChange = (newContent) => {
    setVideo({ ...video, notes: newContent });
  };

  function InputHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    setVideo({ ...video, [name]: value });
  }

  function AddVideo(e) {
    e.preventDefault();

    PatchRequest(`${url}course/edit-video`, {
      courseId: course._id,
      videoId: video._id,
      updatedData: video,
    })
        .then((res) => {
          console.log(res)
            if (res.status) {
            editVideoInState()
          toast({
            title: res?.message,
            status: "success",
            duration: 3000,
          });
          onClose();
        } else {
          console.log(res);
          toast({
            title: res?.data?.message,
            status: "error",
            duration: 3000,
            
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const handleTest = () => {
    window.open("https://dailymotionvideotesting.netlify.app/", "_blank");
    };
    

    function editVideoInState() {
      const updatedVideos = [...videos]; // Make a copy of the state array
        updatedVideos[index] = video
      setVideos(updatedVideos); // Updat
    }


  return (
    <>
      <Button onClick={onOpen}>
        <MdModeEdit style={{ cursor: "pointer", color: "green" }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"95%"}>
          <ModalHeader>Edit Video: {video.title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => AddVideo(e)}>
            <ModalBody>
              <Flex justifyContent={"space-between"}>
                <Stack w="100%">
                  <FormLabel>Video Title</FormLabel>
                  <Input
                    required
                    onChange={(e) => InputHandle(e)}
                    name="title"
                    value={video.title}
                  />

                  <FormLabel>Video ID</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={"https://dai.ly/"} />
                    <Input
                      onChange={(e) => InputHandle(e)}
                      name="url"
                      required
                      value={video.url}
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
                  <VideoPlayer videoId={video.url ? video.url : course.intro} />
                </Box>
              </Flex>

              <FormLabel>Description</FormLabel>
              <Textarea
                required
                onChange={(e) => InputHandle(e)}
                name="description"
                value={video.description}
              />

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
                Save Video
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
