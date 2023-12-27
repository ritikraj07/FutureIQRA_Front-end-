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

const Vip2Course = () => {
  return (
    <Flex
      flexDir={["column"]}
      p={["20px 50px"]}
      w={["100%"]}
      h={["300px"]}
      bg={"rgb(28,29,31)"}
    >
      <Heading color={"gold"} textAlign={"center"}>
        "Unlock advanced skills for a brighter future!"
      </Heading>
      <Text mt={["10px"]} color={"white"} fontWeight="bold">
        Why Choose VIP2 COURSE?
      </Text>
      <List color={"white"} pl="20px">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Discover innovative business ideas and advanced skills for a better
          life and career.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Earn up to{" "}
          <Text as="span" color="gold">
            ₹730
          </Text>{" "}
          per referral, maximizing your potential earnings.
        </ListItem>
        <ListItem display={"flex"} alignItems={"center"}>
          <ListIcon as={MdCheckCircle} color="green.500" />

          <Text style={{ color: "white" }}>
            Avail this exclusive course at an unbeatable price of{" "}
            <span style={{ margin: "0 4px", textDecoration: "line-through" }}>
              ₹1299
            </span>{" "}
            <span style={{ color: "gold" }}> ₹999 </span>.
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

export default Vip2Course;
