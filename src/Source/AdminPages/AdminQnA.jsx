import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { GetRequest, PostRequest } from "../Services/ApiCall";

export default function AdminQnA() {
  const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [All_Question, Set_Question] = useState([]);
  const [query, setQuery] = useState('')
  const [myQandA, setMyQandA] = useState({myQuestion: "", myAnswer: ""})
  const toast = useToast();
  useEffect(() => {
    getQuestion();
  }, []);

  function getQuestion() {
    fetch(`${url}q&a/all/`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const { status, data } = result;
        if (status) {
          Set_Question(data);
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  }


  function filterQuestion(value) {
    let sortedQuestion;
    if (value == 2) {
      sortedQuestion = All_Question.sort((a, b) => {
       return (new Date(a.createdAt))-new Date(b.createdAt)
      })
    } else  if(value==1){
      sortedQuestion = All_Question.sort((b, a) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else {
      sortedQuestion = All_Question.sort((a, b) => {
        return a.answer.length - b.answer.length
      })
    }

    Set_Question([...sortedQuestion])
  }

  function SearchQuestion() {
    // console.log(query)
    GetRequest(`${url}q&a/search?q=${query}`)
      .then((res) => {
        let { status, data } = res;
        if (status && data.length > 0) {
          Set_Question(data);
          //  console.log("data", data)
        } else {
          toast({
            title: "No Question found",
            description: "You can ask a new question",
            status: "info",
            duration: 4000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const QuestionBox = ({ question }) => {
    
    const [answer, setAnswer] = useState(question.answer);
    let token = JSON.parse(localStorage.getItem("token"));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
      let name = "",
        photo = "",
        phone = "";
      if (question?.user[0]) {
        name = question?.user[0]?.name;
        photo = question?.user[0]?.image;
        phone = question?.user[0]?.phone;
      }

    function formatDate(inputDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(inputDate);
      return date.toLocaleDateString("en-US", options);
    }

    function PostAnswer() {
      var raw = JSON.stringify({
        answer,
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${url}q&a/id/${question._id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          toast({
            title: "Answer Added",
            status: "success",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.log("error", error);
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
          });
        });
    }

    function ResetQuestions(id) {
      let newQuestion = All_Question.filter((q) => q._id != id)
      Set_Question([...newQuestion])      
    }
    function DeleteQuestion() {
    
      var raw = JSON.stringify({
        answer: "answer  1",
      });

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${url}q&a/${question._id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          if (result.status) {
                   toast({
                     title: "Question Deleted Successfully",
                     status: "info",
                     duration: 3000,
                   });
                   ResetQuestions(question._id);
          } else {
             toast({
               title: result.data,
               status: "error",
               duration: 3000,
             });
          }

    
          
        })
        .catch((error) => {
          console.log("error", error)
          toast({
            title: "something went wrong",
            status: "error",
            duration:3000
          })
        });
    }


    return (
      <Box
        bg="#272831"
        w={["100%"]}
        borderRadius={["4px"]}
        p={["10px"]}
        px={["30px"]}
        mb={"10px"}
      >
        {/* user who asked question */}
        <Flex my={["10px"]} alignItems={"center"}>
          <Avatar
            src={question?.user[0]?.image}
            alt={question?.user[0]?.name}
          />
          <Flex
            mx={["10px"]}
            flexDir={["column", "column", "row"]}
            alignItems={["flex-start", , "center", "center"]}
          >
            <Text
              mx={["2px", "10px"]}
              color={"pink"}
              fontWeight={["bold"]}
              fontSize={["15px", "18xp"]}
            >
              {name}
            </Text>
            <Text
              mx={["2px", "10px"]}
              color={"white"}
              fontSize={["10px", "12px", "12px"]}
            >
              Asked: {formatDate(question.createdAt)}
            </Text>
          </Flex>
        </Flex>

        {/* question */}
        <Heading size={["xs", "xm", "md"]} color={"white"} mb={["10px"]}>
          {question.question}
        </Heading>

        <Textarea
          color={"whiteAlpha.600"}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={
            question.answer.length == 0 ? "Add Your answer" : question.answer
          }
        />

        <Flex mt={["10px"]}>
          <Button onClick={() => PostAnswer()}>Save</Button>&nbsp; &nbsp; &nbsp;
          <Button onClick={() => DeleteQuestion()}>Delete</Button>
        </Flex>
      </Box>
    );
  };
 const handleKeyDown = (e) => {
   // Check if the Enter key is pressed (key code 13)
   if (e.key === "Enter") {
     // Call your function here, e.g., searchFunction()
     SearchQuestion()
   }
  };

  function HandleInput(e) {
    
    let name = e.target.name;
    let value = e.target.value
    setMyQandA({...myQandA, [name]:value})
  }
  
  function AddQuestion() {
    PostRequest(`${url}q&a/`, { question: myQandA.myQuestion, answer: myQandA.myAnswer })
      .then((res) => {
        // console.log(res)
        if (res.status) {
          toast({
            title: "Question Add Successfully",
            status: 'success',
            duration: 3000,
            description:'Please refresh page'
          })
        } else {
           toast({
             title: "Something went wrong",
             status: "error",
             duration: 3000,
           });
        }
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
          description: error.message
        });
      })
    
  }
  return (
    <Box>
      <Flex
        alignItems={["center"]}
        justifyContent={["space-between"]}
        // m={["2px", "4px", "10px"]}
        flexDir={["column", "column", "row"]}
        bg={"#393E4F"}
        p={["2px", "4px", "10px"]}
      >
        <Heading color="white" m={[1, 2, 0]}>Questions</Heading>
        <InputGroup
          bg={"white"}
          borderRadius={10}
          my={[1, 2, 0]}
          w={["95%", "90%", "30%"]}
        >
          <Input
            focusBorderColor="lime"
            placeholder="Type Search Words"
            onChange={(e) => setQuery(e.target.value)}
            _placeholder={{ opacity: 1, color: "black" }}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement
            pointerEvents="auto"
            cursor={"pointer"}
            children={<SearchIcon color="black" />}
            onClick={SearchQuestion}
          />
        </InputGroup>
        <Select
          bg="white"
          placeholder="Filter"
          value={0}
          onChange={(e) => filterQuestion(e.target.value)}
          my={[1, 2, 0]}
          w={["95%", "90%", "25%"]}
        >
          <option value={1}> New Reports First</option>
          <option value={2}> Old Reports First</option>
          <option value={3}> Not Responded First</option>
        </Select>
        <Button
          mx={["5px"]}
          onClick={() => onOpen()}
          my={[1, 2, 0]}
          w={["95%", "90%", "25%"]}
        >
          Add Question
        </Button>
      </Flex>
      {/* question box */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => HandleInput(e)}
              placeholder="Question Title"
              mb={["5px"]}
              name="myQuestion"
            />
            <Textarea
              onChange={(e) => HandleInput(e)}
              placeholder="Add Answer"
              name="myAnswer"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                AddQuestion();
                onClose();
              }}
              variant="ghost"
            >
              Save & Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* question box */}
      <Box
        h="90vh" // Set height to full viewport height
        overflowY="scroll" // Enable vertical scrollbar
        sx={{
          /* Hide scrollbar */
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Opera
          },
          "&": {
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
          },
        }}
        p="10px"
      >
        {/* question box */}
        {All_Question?.map((question) => (
          <QuestionBox key={question._id} question={question} />
        ))}
      </Box>
    </Box>
  );
}
