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
import ConfirmBtn from "./ConfirmBtm";

export default function DeleteVideo({ course }) {
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videos, setVideos] = useState(course.videos);
  
  const toast = useToast();

const deleteVideoAtIndex = (indexToDelete) => {
  const updatedVideos = [...videos]; // Make a copy of the state array
  updatedVideos.splice(indexToDelete, 1); // Remove the video at the specified index
  setVideos(updatedVideos); // Update the state with the modified array
};
    function DeleteVid(id, index) {
        
        PatchRequest(`${url}course/delete-video`, { courseId: course._id, videoId: id })
            .then((res) => {
                console.log(res)
                if (res.status) {
                    toast({
                        title: 'Video Delete Successfull',
                        status:'success'
                })
                deleteVideoAtIndex(index) 
            }
            }).catch((error) => { console.log(error) })
        
    }

 

  return (
    <>
      <Button onClick={onOpen} w={"100%"} colorScheme="purple">
        Delete Video
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"95%"}>
          <ModalHeader >Delete Video: {course.name}</ModalHeader>
          <ModalCloseButton />
                  <ModalBody>
                      {videos?.map((video, i) => {
                          return (
                            <Flex
                              key={video._id}
                              alignItems="center"
                              justifyContent="space-between"
                              my={3}
                              p={3}
                              borderRadius={5}
                              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                              bg="white"
                            >
                              <Text w={['80%']} noOfLines={1} fontWeight={"light"}>
                                      {i+1}. {video.title}
                              </Text>
                                  <ConfirmBtn
                                      
                                      w={['20%']}
                                      mx={"10px"}
                                      color={"red"}
                                func={() =>DeleteVid(video._id, i)}
                                title="Delete"
                                warn={`Are you sure you want to delete this video ${video.title}`}
                              />
                            </Flex>
                          );
                      })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
