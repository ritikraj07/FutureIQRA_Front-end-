import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { PostRequest } from "../Services/ApiCall";
import { useState } from "react";
import BuyCouse from "./BuyCouse";
import GenerateOrderId from "../Services/OrderId";

const Vip2Course = () => {
  const toast = useToast();
  let [isLoading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  const { name, phone } = useSelector((store) => store.User);

  function BuyCourse(e) {
    e.preventDefault();
    setLoading(true);
    let courseData = {
      token: "26f053-f56883-5d3c09-2d6cda-1f472c",
      order_id: GenerateOrderId(),
      txn_amount: 1,
      txn_note: "Pay For VIP1 Course",
      product_name: "VIP1 Subscription",
      customer_name: name,
      customer_mobile: phone,
      customer_email: email,
      callback_url: "https://www.futureiqra.in/my-learning",
    };

    PostRequest("https://allapi.in/order/create", courseData).then((res) => {
      console.log("res from vip1 Course");
      if (res.status) {
        window.open(res.results.payment_url, "_blank", "width=600,height=400");
      } else {
        toast({
          status: "info",
          title: "Something went wrong",
          description: "Please Try Again Later",
        });
      }
    });

    setLoading(false);
  }
  return (
    <Flex
      flexDir={["column"]}
      p={["5px", "20px 50px"]}
      w={["100%"]}
      // h={["300px"]}
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

      <BuyCouse
        title={"Subscription for VIP2"}
        onSubmit={BuyCourse}
        phone={phone}
        name={name}
        setEmail={setEmail}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default Vip2Course;
