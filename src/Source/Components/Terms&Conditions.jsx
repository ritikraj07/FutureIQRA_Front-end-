import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const TermsAndConditions = () => {
  return (
    <Box bg={"white"} p={"20px 50px"}>
      <Heading as="h1" mb={4}>
        Terms and Conditions for FutureIQRA.in
      </Heading>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          1. Course Purchases
        </Heading>
        <Text>
          Users purchasing courses agree to pay the specified fees for access to
          e-learning content. Refunds or cancellations are subject to the Refund
          Policy.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          2. Use of Content
        </Heading>
        <Text>
          All course materials and content provided on FutureIQRA.in are for
          personal, non-commercial use. Reproduction, distribution, or
          unauthorized use of course materials is prohibited.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          3. User Responsibilities
        </Heading>
        <Text>
          Users are responsible for maintaining the confidentiality of their
          account credentials. Ensuring that provided information (name,
          address, etc.) is accurate and up-to-date.
        </Text>
      </Box>

      <Box mb={8}>
        <Heading as="h2" mb={4}>
          4. Limitation of Liability
        </Heading>
        <Text>
          FutureIQRA.in and its associates are not liable for any direct,
          indirect, or consequential damages arising from the use or inability
          to use the website or its content.
        </Text>
      </Box>

      {/* Add more sections for Privacy Policy, Contact Information, etc. */}

      <Box>
        <Heading as="h2" mb={4}>
          Contact Information
        </Heading>
        <Text>
          For inquiries or concerns regarding these Terms and Conditions:
          <br />
          Email: dilshanalam674@gmail.com
          <br />
          Address: District Purnea, State Bihar, Country India, P/O Amari
          Kukroon, P/S Dhamdaha, Pin Code 854205
        </Text>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;
