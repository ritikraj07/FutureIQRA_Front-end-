import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  Flex,
  useToast
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { PostRequest } from "../Services/ApiCall";
import { useState } from "react";
import BuyCouse from "./BuyCouse";


const Vip1Course = () => {
    const url = import.meta.env.VITE_API_URL;
  
  const toast = useToast()
  let [isLoading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  const { name, phone, _id } = useSelector((store) => store.User);

  function BuyCourse(e) {
    e.preventDefault();
    setLoading(true)
    
    let courseData = {
      amount: 1,
      note: "Pay For VIP1 Course",
      product_name: "VIP1 Subscription",
      email: email,  
      
    };

    PostRequest(`${url}payment/api/proxy`, courseData).then((res) => {
      console.log("form vip1cours buycourse postrequest", res);
      if (res.status) {
        window.open(res.results.payment_url, "_blank");
      } else {
        console.log(res)
        toast({
          status: "info",
          title: "Something went wrong",
          description: "Please Try Again",
        });
      }
    }).catch((error) => {
      console.log('error form vip1cours buycourse postrequest', error)
    })

    setLoading(false)
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
          <Text style={{ color: "white" }}>
            Get a 1-month subscription for just{" "}
            <span style={{ margin: "0 4px", textDecoration: "line-through" }}>
              ₹799
            </span>{" "}
            <span style={{ color: "gold" }}> ₹499 </span>.
          </Text>
        </ListItem>
      </List>

      <BuyCouse
        title={"Subscription for VIP1"}
        onSubmit={BuyCourse}
        phone={phone}
        name={name}
        setEmail={setEmail}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default Vip1Course;
