import { Box, Text, Button, Progress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { PostRequest } from "../Services/ApiCall";
import UnauthorizedPage from "../Components/Unauthorized";
import calculateExpirationTime from "../Services/TimeServices";

export default function ThankYou() {
  const url = import.meta.env.VITE_API_URL;
  const { name, _id } = useSelector((state) => state.User);
  const toast = useToast();
  
  const {orderId } = useParams();
  const [state, setState] = useState("processing");
  const [courseType, setCourseType] = useState("");
  const [expireTime, setExpireTime] = useState("");
  useEffect(() => {
    CheckStatus();
  }, []);

  function CheckStatus() {
    setState("processing");

    PostRequest(`${url}payment/order/status/${orderId}`)
      .then((res) => {
        // console.log("console form order status", res);
        if (res?.status) {
          if (res.results) {
            let amount = res.results?.txn_amount;
            let expireTime = calculateExpirationTime(
              res.results.txn_date
            );
            if (amount == 499) {
              setCourseType("VIP1");
              setState("success");
              setExpireTime(expireTime);
            } else {
              setCourseType("VIP2");
              setState("success");
              setExpireTime(expireTime);
            }
            MentionData(res.results);
          } else {
            console.log(res);
            setState("fail");
            MentionData(res.status.results);
          }
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
        setState("fail");
      });
  }

  function MentionData(paymentData) {
    let payData = {
      transactionId: paymentData.txn_id,
      orderId: paymentData.order_id,
      merchant: {
        id: paymentData.merchant_id,
        name: paymentData.merchant_name,
        vpa: paymentData.merchant_vpa,
      },
      transactionDate: paymentData.txn_date,
      amount: paymentData.txn_amount,
      product: paymentData.product_name,
      customer_email: paymentData.customer_email,
      bank: {
        orderId: paymentData.bank_orderid,
        utrNumber: paymentData.utr_number,
      },
      paymentMode: paymentData.payment_mode,
      status: paymentData.status,
      expireTime: expireTime,
      phone: paymentData.customer_mobile,
    };
    PostRequest(`${url}user/add-payment-history`, payData)
      .then((res) => {
      console.log(res)
    })
  }

  return (
    <Box minW={"100vh"} minH={"100vh"} bg={"white"}>
      <Navbar />
      {state == "unauthorized" && <UnauthorizedPage />}
      {state == "processing" && <TransactionStatusComponent />}
      {state == "success" && (
        <SuccessfullPayment
          name={name}
          courseType={courseType}
          expireTime={expireTime}
        />
      )}
      {state === "fail" && <FailedTransactionComponent />}
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
