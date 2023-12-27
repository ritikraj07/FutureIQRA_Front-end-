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
import { GetRequest, PatchRequest } from "../../Services/ApiCall";

export default function EditCourse({course_}) {
  
  const toast = useToast();
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [course, setCourse] = useState(course_);

 

  function InputHandle(e) {
    let name = e.target.name;
    let value = e.target.value;
    setCourse({ ...course, [name]: value });
  }


  function edit_course(event) {
    event.preventDefault();
    PatchRequest(`${url}course/update-course`, course)
      .then((res) => {
        if (res.status) {
          toast({
            title: "Course Updated Successfully!",
            status: 'success',
            duration: 3000
          })
          onClose()
        } else {
          toast({
            title: 'Something wend wrong',
            status: 'error',
            duration: 5000,
            description: res.message
          })
      }
    })
  }


  return (
    <>
      <Button onClick={onOpen} w={"100%"} colorScheme="telegram">
        Edit Course
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={["95%"]}>
          <ModalHeader color="purple">{course?.name}</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => edit_course(e)}>
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
                    <Input
                      name="intro"
                      value={course.intro}
                      onChange={InputHandle}
                      required
                    />
                  </InputGroup>
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children={"Course Name"} />
                  <Input
                    value={course.name}
                    required
                    name="name"
                    onChange={InputHandle}
                  />
                </InputGroup>
                <Stack
                  spacing={2}
                  flexDir={["column", "column", "column", "row"]}
                >
                  <InputGroup>
                    <InputLeftAddon children={"Price Rs: "} />
                    <Input
                      min={0}
                      required
                      type="number"
                      onChange={InputHandle}
                      name="price"
                      value={course.price}
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
                      value={course.discount}
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
                      value={course.duration}
                    />
                    <InputRightAddon children={"Hr"} />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftAddon children={"Course Type"} />
                    <Select
                      onChange={(e) => InputHandle(e)}
                      borderRadius={"0px 5px 5px 0px"}
                      required
                      cursor={"pointer"}
                      defaultValue={"VIP1"}
                      name="coursetype"
                      value={course.coursetype}
                    >
                      <option value={"VIP1"}>VIP1</option>
                      <option value={"VIP2"}>VIP2</option>
                    </Select>
                  </InputGroup>
                </Stack>

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
                    value={course.instructor.name}
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
                    value={course.instructor.bio}
                  />
                </InputGroup>

                <InputGroup flexDir={"column"}>
                  <FormLabel>About this course</FormLabel>
                  <Textarea
                    value={course.description}
                    name="description"
                    onChange={InputHandle}
                  />
                </InputGroup>
              </Stack>
            </ModalBody>

            <ModalFooter  >
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              
              <Button
                // onClick={() => console.log(course)}
                type="submit"
                colorScheme="teal"
              >
                Update & Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
