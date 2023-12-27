import React from "react";

import { Box, Image, Tab, TabList, Tabs, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Navbar() {
    
    return (
      <Box>
        <Flex px={5} py={2}>
          <Link to={"/"}>
            <Image
              w={"120px"}
              h="40px"
              src="src\Source\Assets\referralrich.png"
              alt="Referral Rich"
            />
          </Link>
          
        </Flex>
      </Box>
    );
}