import { Box, Text, Button, Progress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { GetRequest, PostRequest } from "../Services/ApiCall";
import { Link as RouterLink } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

import UnauthorizedPage from "../Components/Unauthorized";
import { FormateDDMMYYYY } from "../Services/DateRelated";

export default function ThankYou() {
  const url = import.meta.env.VITE_API_URL;
  const { name } = useSelector((state) => state.User);
  const toast = useToast();
  const { orderId } = useParams();
  const [state, setState] = useState("processing");
  const [paymentData, setPaymentData] = useState()
  

  useEffect(() => {
    CheckStatus();
  }, []);

  function CheckStatus() {
    setState("processing");

    GetRequest(`${url}payment/order-status/${orderId}`)
      
      .then((res) => {
        console.log("console form order status", res)
        if (res?.status) {
          setPaymentData(res?.data)
          setState(res.data.status)
        } else {
          console.log(res);
          setState("unauthorized");
        }
      })
      .catch((error) => {
        console.log("Error from Thank you page", error);
        toast({
          title: "Something went wrong",
          status: "error",
        });
        setState("unauthorized");
      });
  }

  return (
    <Box minW={"100vh"} minH={"100vh"} bg={"white"}>
      <Navbar />
      {state == "unauthorized" && <UnauthorizedPage />}
      {state == "processing" && <TransactionStatusComponent />}
      {state == "Success" && (
        <SuccessfullPayment
          name={name}
          courseType={paymentData.product}
          expireTime={FormateDDMMYYYY(paymentData.expireTime)}
        />
      )}
      {state === "Failed" && <FailedTransactionComponent />}
      {state === 'Pending' && <PendingTransactionComponent />}
      {state==='Expire' && <ExpiredTransactionComponent product={paymentData.product} /> }
    </Box>
  );
}
function SuccessfullPayment({ name, courseType, expireTime }) {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      alignContent={"center"}
      w="100%"
      h="100vh"
    >
      <Text mt={"100px"} mb={["20px", "40px"]} fontSize={"xxx-large"}>
        🎉 Thank You 🎉
      </Text>
      <Text>
        Hey {name.split(" ")[0]}, Thank you for taking {courseType}{" "}
        Subscription.
      </Text>
      <Text>
        You can start learning now.{" "}
        <Link style={{ color: "blue" }} to="/my-learning">
          Click here
        </Link>{" "}
        to checkout your courses.
      </Text>
      <Text>Your Subscription Will Expire on {expireTime} </Text>
      <Button
        mt={"30px"}
        colorScheme="teal"
        onClick={() => navigate("/refer&earn")}
      >
        INVITE YOUR FRIENDS OR FAMILY AND GET REWARD
        <FaPaperPlane style={{ color: "yellow", marginLeft: "10px" }} />
      </Button>
    </Box>
  );
}
const TransactionStatusComponent = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.100"
    >
      <Box p={8} bg="white" borderRadius="lg" boxShadow="md" textAlign="center">
        <Progress
          borderRadius="10px"
          colorScheme="purple"
          size="lg"
          w="100%"
          isIndeterminate
          mb={4}
        />
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Please don't leave this page.
        </Text>
        <Text fontSize="md" color="gray.600">
          Checking your status...
        </Text>
      </Box>
    </Box>
  );
};

const FailedTransactionComponent = () => (
  <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    h="100vh"
    bg="gray.100"
  >
    <Box
      p={8}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
      maxW="400px"
    >
      <FaExclamationCircle
        style={{ margin: "auto" }}
        color="#FF4500"
        size={50}
      />
      <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
        Transaction Failed
      </Text>
      <Text fontSize="md" color="gray.600" mb={4}>
        Oops! Something went wrong during the transaction process.
      </Text>
      <Link to="/">
        <Button colorScheme="teal">Back to Home</Button>
      </Link>
    </Box>
  </Box>
);


const PendingTransactionComponent = () => (
  <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    h="100vh"
    bg="gray.100"
  >
    <Box
      p={8}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
      maxW="400px"
    >
      {/* Icon for pending status (you can choose an appropriate icon) */}
      <FaExclamationCircle
        style={{ margin: "auto" }}
        color="#FFAA00"
        size={50}
      />

      <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
        Transaction Pending
      </Text>
      <Text fontSize="md" color="gray.600" mb={4}>
        Your transaction is pending. Please wait for confirmation.
      </Text>

      {/* Button to go back to the home page (you can customize the link) */}
      <Link as={RouterLink} to="/">
        <Button colorScheme="teal">Back to Home</Button>
      </Link>
    </Box>
  </Box>
);

const ExpiredTransactionComponent = ({ product }) => {
  const navigate = useNavigate();
  product = product.toString().toLowerCase();

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="#f7f7f7" // Adjust the background color as needed
    >
      <Box
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        maxW="400px"
      >
        <FaRegSadTear style={{margin:'auto'}} color="#e74c3c" size={50} />
        <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
          Subscription Expired
        </Text>
        <Text fontSize="md" color="gray.600" mb={4}>
          Oops! The subscription for {product} has expired.
        </Text>
        <Button
          colorScheme="whatsapp"
          onClick={() => navigate(`/course/${product}`)}
          mr={2}
          mb={2}

        >
          Renew Subscription
        </Button>
        <Button colorScheme="purple" onClick={() => navigate("/")}>
          Explore More Courses
        </Button>
      </Box>
    </Box>
  );
};