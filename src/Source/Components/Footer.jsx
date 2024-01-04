import { Box, Flex, Text } from "@chakra-ui/react";
import {} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";

export default function Footer() {
  let navigate = useNavigate();
  function MyText({ text, onClick }) {
    return (
      <Text
        onClick={onClick}
        fontWeight={"100"}
        fontSize={"small"}
        color={"white"}
        cursor={"pointer"}
        _hover={{ color: "blue.500" }}
      >
        {text}
      </Text>
    );
  }
  return (
    <Flex bg={"black"} p={"10px"} justifyContent={"space-evenly"}>
      {/* useful links */}
      <Box>
        <Text mb={"10px"} color={"white"}>
          USEFUL LINKS
        </Text>
        <MyText
          onClick={() => {
            navigate("/");
          }}
          text={"Home"}
        />
        <MyText
          onClick={() => {
            navigate("/my-learning");
          }}
          text={"My Learning"}
        />
        <MyText
          onClick={() => {
            navigate("/q&a");
          }}
          text={"FAQ"}
        />
        <MyText
          onClick={() => {
            navigate("/report");
          }}
          text={"Contact Us"}
        />
        <MyText onClick={() => navigate("/about-us")} text={'About Us'} />
      </Box>

      {/* legal links */}
      <Box>
        <Text mb={"10px"} color={"white"}>
          LEGAL LINKS
        </Text>
        <MyText
          onClick={() => {
            navigate("/privacy&policy");
          }}
          text={"Privacy Policy"}
        />
        <MyText
          onClick={() => {
            navigate("/terms&conditions");
          }}
          text={"Terms & Conditions"}
        />
        <MyText
          onClick={() => {
            navigate("/refunds&returns-policy");
          }}
          text={"Refunds & Returns Policy"}
        />
      </Box>

      {/* Contact */}
      <Box>
        <Text mb={"10px"} color={"white"}>
          CONTACT
        </Text>
        <Flex mb={"3px"} color={"white"} display={"flex"} alignItems={"center"}>
          <FaLocationDot style={{ marginRight: "5px" }} />
          <Text
            fontWeight={"100"}
            fontSize={"small"}
            color={"white"}
            cursor={"pointer"}
            _hover={{ color: "blue.500" }}
          >
            Purnea Bihar 854205, India
          </Text>
        </Flex>

        <Flex mb={"3px"} color={"white"} display={"flex"} alignItems={"center"}>
          <IoMdCall style={{ color: "white", marginRight: "4px" }} />
          <Text
            fontWeight={"100"}
            fontSize={"small"}
            color={"white"}
            cursor={"pointer"}
            _hover={{ color: "blue.500" }}
          >
            +91 7485930242
          </Text>
        </Flex>

        <Flex mb={"3px"} color={"white"} display={"flex"} alignItems={"center"}>
          <IoMdMail style={{ color: "white", marginRight: "4px" }} />
          <Text
            fontWeight={"100"}
            fontSize={"small"}
            color={"white"}
            cursor={"pointer"}
            _hover={{ color: "blue.500" }}
          >
            dilshanalam674@gmail.com
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
