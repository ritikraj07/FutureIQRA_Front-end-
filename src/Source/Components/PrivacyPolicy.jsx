import React from "react";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box bg={"white"}>
      <Box m={"10px 50px"}>
        <Heading as="h1" mb={4}>
          Privacy Policy for FutureIQRA.in
        </Heading>

        <Box mb={8}>
          <Heading as="h2" mb={4}>
            Collection of Information
          </Heading>
          <Text mb={4}>
            We collect personal information, including but not limited to:
          </Text>
          <UnorderedList>
            <ListItem>Name</ListItem>
            <ListItem>Email Address</ListItem>
            <ListItem>Phone Number</ListItem>

            <ListItem>
              Other relevant details required for course purchase and user
              engagement.
            </ListItem>
          </UnorderedList>
        </Box>

        <Box mb={8}>
          <Heading as="h2" mb={4}>
            Use of Information
          </Heading>
          <Text mb={4}>The information collected is used for:</Text>
          <UnorderedList>
            <ListItem>Processing course purchases and registrations</ListItem>
            <ListItem>Providing customer support</ListItem>
            <ListItem>
              Sending relevant updates and promotional content
            </ListItem>
            <ListItem>Improving website services and user experience</ListItem>
          </UnorderedList>
        </Box>

        <Box mb={8}>
          <Heading as="h2" mb={4}>
            Data Protection
          </Heading>
          <Text>
            We employ industry-standard security measures to protect user data
            against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </Box>

        {/* Add other sections similarly */}

        <Box>
          <Heading as="h2" mb={4}>
            Contact Us
          </Heading>
          <Text>
            For inquiries or concerns regarding this Privacy Policy, contact us
            at:
            <br />
            Email: future.iqra.helpline@gmail.com
            <br />
            Address: District Purnea, State Bihar, Country India, P/O Amari
            Kukroon, P/S Dhamdaha, Pin Code 854205
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
