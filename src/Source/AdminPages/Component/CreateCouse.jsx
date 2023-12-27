import { useState } from "react";
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

import { PostRequest } from "../../Services/ApiCall";

export default function CreateCourse() {
  const toast = useToast();
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [course, setCourse] = useState({
    name: "",
    price: "",
    description: "",
    discount: 0,
    intro: "",
    coursetype:"VIP1",
    instructor: {
      name: "",
      bio: "",
    },
  });

  function InputHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    setCourse({ ...course, [name]: value });
  }

  function createNewCourse(event) {
    event.preventDefault();

    PostRequest(`${url}course/create`, course).then((res) => {
      console.log(res);
      if (res.status) {
        toast({
          status: "success",
          title: res.message,
          duration: 3000,
        });
      } else {
        toast({
          status: "error",
          title: res.message,
          duration: 3000,
        });
      }
    });

    onClose();
  }

  return (
    <>
      <Button
        mx={["5px"]}
        onClick={onOpen}
        my={[1, 2, 0]}
        w={["95%", "90%", "25%"]}
      >
        Create Course
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple">Create New Course</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => createNewCourse(e)}>
            <ModalBody>
              <Stack spacing={2}>
                {/* Course Intro Link */}
                <InputGroup flexDir={"column"}>
                  <FormLabel>
                    Course Intro Video Link
                    <Badge mx={3} colorScheme="purple">
                      <Link
                        target="_blank"
                        href="https://dailymotionvideotesting.netlify.app/"
                      >
                        {" "}
                        Test Here
                      </Link>
                    </Badge>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={"https://dai.ly/"} />
                    <Input name="intro" onChange={InputHandle} required />
                  </InputGroup>
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Course Name"} />
                  <Input required name="name" onChange={InputHandle} />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Price Rs: "} />
                  <Input
                    min={0}
                    required
                    type="number"
                    onChange={InputHandle}
                    name="price"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Discount"} />

                  <Input
                    required
                    name="discount"
                    onChange={InputHandle}
                    type="number"
                    min={0}
                    max={100}
                  />
                  <InputRightAddon children={"%"} />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Course Duration"} />
                  <Input
                    name="duration"
                    onChange={InputHandle}
                    required
                    type="number"
                    min={0}
                  />
                  <InputRightAddon children={"Hr"} />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Course Type"} />
                  <Select
                    onChange={(e)=>InputHandle(e)}
                    borderRadius={"0px 5px 5px 0px"}
                    required
                    cursor={"pointer"}
                    defaultValue={'VIP1'}
                    name="coursetype"
                  >
        
                    <option value={'VIP1'} >VIP1</option>
                    <option value={'VIP2'}  >VIP2</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={"Instructor Name"} />
                  <Input
                    required
                    name="instructor.name"
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        instructor: {
                          ...course.instructor,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </InputGroup>

                <InputGroup flexDir={"column"}>
                  <FormLabel>About Instructor</FormLabel>
                  <Textarea
                    required
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        instructor: {
                          ...course.instructor,
                          bio: e.target.value,
                        },
                      })
                    }
                  />
                </InputGroup>

                <InputGroup flexDir={"column"}>
                  <FormLabel>About this course</FormLabel>
                  <Textarea name="description" onChange={InputHandle} />
                </InputGroup>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            
              <Button
                // onClick={() => console.log(course)}
                type="submit"
                colorScheme="teal"
              >
                Add Course
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
