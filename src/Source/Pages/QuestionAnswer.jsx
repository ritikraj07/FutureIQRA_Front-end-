import {useEffect, useState, useRef, useCallback} from "react";

import {
  Box,
  Text,
  Image,
  Flex,
  Avatar,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  useToast
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import QuestionAnswerBox from "../Components/QuestionAnswerBox";
import { GetRequest } from "../Services/ApiCall";

export default function QuestionAnswer() {
    const url = import.meta.env.VITE_API_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, photo } = useSelector((state) => state.User)
  const [All_Question, Set_Question] = useState([])
  
  let timeoutId = useRef()
    
  const toast = useToast();




  useEffect(() => {
    getQuestion()
    // console.log('43 first useEffect')
  }, [])
    

  function EditLike(index, newQuestion ) {
    // console.log("==", index, newQuestion);
    
    let oldQuestion = All_Question;
    oldQuestion[index].liked = newQuestion.liked
    Set_Question([...oldQuestion])
    // console.log(All_Question)

  }
  

  function getQuestion() {
    // console.log('getQuestion function')

    fetch(`${url}q&a/all/`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        const {status, data } = result;
        if (status) {
          Set_Question(data)
        } else {
          
        }
        

      })
      .catch((error) => console.log("error", error));
  }


  function QuestionBox() {
    const [myQuestion, setMyQuestion] = useState("");


    

      function AskedAQuestion() {
        // console.log(myQuestion);

        

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${JSON.parse(localStorage.getItem('token'))} `
        );

        var raw = JSON.stringify({
          question: myQuestion,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${url}q&a/`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // console.log(result)
            toast({
              title: "Question Added",
              status: "info",
              duration:3000
            })
          })
          .catch((error) => {
            console.log("error", error)
            toast({
              title: "Something went wrong",
              status: "error",
              duration:3000
            })
          });


        onClose()
      }
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Doubt</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Hi {name} 👋, Please enter you query?</Text>
              <Textarea onChange={(e)=>setMyQuestion(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="facebook" onClick={()=>AskedAQuestion()} >Send</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  function MyBtm({name, colorScheme, onClick}) {
    return <Button onClick={onClick} colorScheme={colorScheme} w={['100%', '100%', '100%', '95%']} m={'5px'} >{name}</Button>
  }

  
  function sortMyQuestion(value) {
    let newSortData;
    // console.log(value)
    if (value == 'liked') {
      newSortData = All_Question.sort((b,a) => a.liked.length - b.liked.length)
    } else {
      newSortData = All_Question.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    

    // console.log(newSortData)

    Set_Question([...newSortData])
    
    // console.log( '==>??>' ,All_Question)
  }

  

  const performSearch = (value) => {

    //  console.log(value)
     GetRequest(`${url}q&a/search?q=${value}`)
       .then((res) => {
         let { status, data } = res
         if (status && data.length>0) {
           Set_Question(data)
          //  console.log("data", data)
         } else {
           toast({
             title: 'No Question found',
             description: 'You can ask a new question',
             status: 'info',
             duration: 4000,
           })
         }
         
       })
     .catch((error)=>{console.log(error)})

   };

  
  const debounce = (func, delay) => {
     
    //  console.log("timeoutId===>", timeoutId)
     return (value) => {
       clearTimeout(timeoutId.current);
       timeoutId.current = setTimeout(() => {
         func(value);
       }, delay);
     };
  };
  
  const debouncedSearch = debounce(performSearch, 500);

  const handleInputChange = (event) => {
    const { value } = event.target;
    // setSearchTerm(value);
    debouncedSearch(value);
  };

    


  
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      px={["1px", "10px", "20px", "30px", "40px"]}
      bg="#33353B"
      minH={window.innerHeight}
      w={"100%"}
      overflow={"hidden"}
    >
      <QuestionBox />
      <Box
        // border={"1px solid red"}
        w={"100%"}
        // backgroundColor={"#2658e6"}

        px={[1, 10]}
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          w={"80px"}
          h="80px"
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR8GeqMZenKekmh_Y-RZIPMrFPE_ykV7e79-vDsCyqAEHh6HzMwigDyEpRBuBylupqLDCtQlwcCRS_uGn6MZLQia_0B=w1920-h907"
          alt="FutureIQRA"
        />

        <Flex alignItems={"center"}>
          <Avatar src={photo} />
          <Box ml="3">
            <Text color={"white"} fontWeight="bold">
              {name}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* left side box */}
      <Flex
        // border={"1px solid red"}
        w={"100%"}
        alignItems={["center", "center", "center", "flex-start"]}
        justifyContent={["center", "space-between"]}
        flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}
      >
        <Box
          w={["95%", "90%", "90%", "70%"]}
          h="100vh"
          overflowY="scroll"
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
        >
          <Box mb={["20px", "30px"]}>
            <Heading size={["xm", "md", "lg"]} mb={["20px"]} color={"white"}>
              Clear your doubts!
            </Heading>
            <InputGroup bg={"white"} borderRadius={10}>
              <Input
                focusBorderColor="lime"
                placeholder="Type Search Words"
                _placeholder={{ opacity: 1, color: "black" }}
                onChange={handleInputChange}
              />
              <InputRightElement
                pointerEvents="auto"
                cursor={"pointer"}
                children={<SearchIcon color="black" />}
              />
            </InputGroup>
          </Box>

          {/* question and aswer box */}
          {All_Question?.map((question, i) => {
            if (question.answer != "") {
              return (
                <QuestionAnswerBox
                  key={question._id}
                  question={question}
                  index={i}
                  EditLike={EditLike}
                />
              );
            }
          })}
        </Box>

        {/* right side box */}

        <Flex
          flexDir={"column"}
          align={"center"}
          w={["95%", "90%", "90%", "30%"]}
          m={"10px"}
        >
          {/* filter buttons */}
          {/* tags */}
          <MyBtm
            onClick={() => sortMyQuestion("liked")}
            colorScheme={"teal"}
            name={"Most Liked"}
          />
          <MyBtm
            onClick={() => sortMyQuestion("latest")}
            colorScheme={"whatsapp"}
            name={"Latest Asked"}
          />

          {/* <MyBtm colorScheme={"twitter"} name={"Least Asked"} /> */}
          {/* Asked new question */}
          <Button
            colorScheme="cyan"
            onClick={onOpen}
            margin={"auto"}
            my={["5px"]}
            color={"white"}
            w={["100%", "100%", "100%", "95%"]}
          >
            I Have A New Doubt! 🤚
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}


