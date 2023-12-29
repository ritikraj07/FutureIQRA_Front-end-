import {useEffect, memo} from "react";

import {
  Box,
  Text,  
  Flex,
  Avatar,
  Heading,
  useToast

} from "@chakra-ui/react";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { PatchRequest } from "../Services/ApiCall";

function QuestionAnswerBox({ question, index, EditLike}) {
  const url = import.meta.env.VITE_API_URL;
  const toast = useToast();
  // console.log("from question box==>", question);

  


  let { name, photo, phone } = question?.user[0];
  // console.log('render qa box');

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  }

 


  function Like() {
    PatchRequest(`${url}q&a/like/${question._id}`)
      .then((res) => {
        const { status, message } = res;
        console.log(res);
        if (status) {
          let newQuestion = res.question
          EditLike(index, newQuestion)
          
          toast({
            title: message,
            status: "info",
            duration: 3000,
          });
        } else {
          toast({
            title: message,
            status: "error",
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        const { status, message } = error;
        toast({
          title: message,
          status: "error",
          duration: 3000,
        });
        console.log(error);
      });
  }

  return (
    <Box
      bg="#272831"
      borderRadius={["4px"]}
      p={["10px"]}
      px={["30px"]}
      mb={"10px"}
      w={"100%"}
      
    >
      {/* user who asked question */}
      <Flex my={["10px"]} alignItems={"center"}>
        <Avatar src={photo || "https://bit.ly/sage-adebayo"} />
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
      <Text color={"whiteAlpha.600"}>
        {question.answer.length == 0
          ? "We will answer this question ASAP"
          : question.answer}
      </Text>

      <Box w={"100%"} h={"0.2px"} bg={"grey"} my={"15px"}></Box>

      <Flex py={["5px"]} align={"center"}>
        {question.liked.includes(phone) ? (
          <AiFillLike
            onClick={Like}
            style={{ fontSize: 20, color: "yellow", cursor: "pointer" }}
          />
        ) : (
          <AiOutlineLike
            onClick={Like}
            style={{ fontSize: 20, color: "white", cursor: "pointer" }}
          />
        )}{" "}
        &nbsp; &nbsp;
        <Text color={"grey"}> {question.liked.length} people like this</Text>
      </Flex>
    </Box>
  );
}



export default memo(QuestionAnswerBox)