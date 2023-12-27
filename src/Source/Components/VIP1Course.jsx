import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const Vip1Course = () => {
  return (
    <Flex
      flexDir={["column"]}
      p={["5px", "20px 50px"]}
      w={["100%"]}
      // h={["300px"]}
      bg={"rgb(28,29,31)"}
    >
      <Heading color={"gold"} textAlign={"center"}>
        "Unlock your potential and master the skills you need!"
      </Heading>
      <Text mt={["10px"]} color={"white"} fontWeight="bold">
        Why Choose VIP1 COURSE?
      </Text>
      <List color={"white"} pl="20px">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Learn the latest and vital problem-solving skills through easy and
          intuitive methods.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Earn up to{" "}
          <Text as="span" color="gold">
            540 credits
          </Text>{" "}
          per referral, maximizing your potential earnings.
        </ListItem>
        <ListItem display={"flex"} alignItems={"center"}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <Text style={{color:'white'}} >
            Get a 1-month subscription for just{" "}
            <span style={{ margin: "0 4px", textDecoration: "line-through" }}>
              ₹799
            </span>{" "}
            <span style={{ color: "gold" }}> ₹499 </span>.
          </Text>
        </ListItem>
      </List>
      <Button
        _hover={{ color: "blue.500", bg: "white" }}
        alignSelf={"flex-end"}
        m={"14px auto"}
        borderRadius={"0"}
        color={"white"}
        bg={"blue.500"}
        variant="solid"
      >
        Buy Now
      </Button>
    </Flex>
  );
};

export default Vip1Course;
