import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const ReturnsRefundsPolicy = () => {
  return (
    <Box bg={"white"} p={"20px 50px"}>
      <Heading as="h1" mb={4}>
        Returns and Refunds Policy for FutureIQRA.in
      </Heading>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          1. Eligibility for Refunds
        </Heading>
        <Text>
          We regret to inform you that due to the nature of our digital products
          (online courses), <strong>we do not offer returns or refunds</strong>{" "}
          once a purchase is made.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          2. Quality and Satisfaction Guarantee
        </Heading>
        <Text>
          If you encounter any issues or have concerns about the content or
          functionality, please reach out to our support team at
          dilshanalam674@gmail.com for assistance.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          3. Initiating Returns or Disputes
        </Heading>
        <Text>
          While purchases are non-refundable, we encourage customers to contact
          us in case of any issues with their course access or content. Our team
          will investigate and provide support within a reasonable time frame.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          4. Contact Information
        </Heading>
        <Text>
          <strong>Email:</strong> dilshanalam674@gmail.com
          <br />
          <strong>Address:</strong> District Purnea, State Bihar, Country India,
          P/O Amari Kukroon, P/S Dhamdaha, Pin Code 854205
        </Text>
      </Box>
    </Box>
  );
};

export default ReturnsRefundsPolicy;
