import {} from "react";
import { Box, Heading, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaCrown } from "react-icons/fa";
export default function TopLeaders({ leaderboard }) {
  let lb = leaderboard;
 
  
  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
      <Flex alignItems={"end"} justifyContent={"center"}>
        {/* second */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"}>
            <Box bg={"#22C35E"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[1].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontWeight="extrabold"
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {lb[1].name}
            </Text>
            <Text
              color={"#22C35E"}
              fontWeight={"extrabold"}
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {" "}
              ₹ {lb[1].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"150px"}
            w={"100%"}
            bg={"#22C35E"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYSQJA7KhMYpqmYZqbPAJQ8nsx3M2jNfpRNYq2MLmsBGmFTgy7EkFrNixCj9VXEXBX4MSwvRhh-JT1VV42C9bQ5ABvua5Q=w1920-h859"
            />
          </Flex>
        </Flex>
        {/* first */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"}>
            <Box bg={"gold"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[0].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontWeight="extrabold"
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
            >
              {lb[0].name}
            </Text>
            <Text
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
              color={"white"}
              fontWeight={"extrabold"}
            >
              {" "}
              ₹ {lb[0].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"200px"}
            w={"100%"}
            bg={"gold"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYQvuMg2k-bzYZapxyTNdmIs86CbgxXoH0mxElWWjJ6EL-CHfw-hXDUwmIgme5FjCDYcfRS4QMsz0VaKGshIl5NYnXTu=w1920-h859"
            />
          </Flex>
        </Flex>

        {/* third */}
        <Flex flexDir={"column"} align={"center"} w={["75px", "80px", "90px"]}>
          {/* profile */}
          <Flex flexDir={"column"} align={"center"} overflowX={"hidden"}>
            <Box bg={"#264653"} p="1" borderRadius={"50%"}>
              <Image
                w={["40px", "55px", "70px"]}
                h={["40px", "55px", "70px"]}
                src={lb[2].image}
                borderRadius={"50%"}
              />
            </Box>
            <Text
              fontSize={["small", "xs", "sm"]}
              fontWeight="extrabold"
              noOfLines={1}
            >
              {lb[2].name}
            </Text>
            <Text
              noOfLines={1}
              fontSize={["small", "xs", "sm"]}
              color={"#264653"}
              fontWeight={"extrabold"}
            >
              {" "}
              ₹ {lb[2].wallet}
            </Text>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"100px"}
            w={"100%"}
            bg={"#264653"}
          >
            <Image
              w={["60%", "70%", "80%"]}
              src="https://lh3.googleusercontent.com/fife/AGXqzDmDI-QNW_Vgi-LYhezLSx4yVU_HNlxfbtVZx3x1AH1oEr7ctdgfWL39aFsiqTeVB29qKFJFa7baOyDJ5OeQ9WrmSPqLGp9nNwztb4rGtVikdwtLKWDHB2vOUAoVkDVcBu1H0P6Mfl_G9-ydzOyBHBOalbUnONlxF6Z0G9cCtBh5UY_vR4waP0lxtpFBKMJJKWGxWRgrVicZoFIROv0CxKlSz5eDWrKzX1iCUR4YmYdKmV0PFnuWD3A71IoQG0BPBAZ8CZxJGHcL-38OBLn_KEykjH_Kda02wce8H5DDEPbcWS92VaSBeLAMKqEsqFvUmqzKJ9vVnPWRlvsf9tspgsGhMnR9TjdYtb1jWP8E7s8-8oR9E8Sf3qXc4glL2YsFwWaLj5uCQa6rLW-nggKjBmVQzjxrMFPqWwYQgduIzmY1CcJoskoaPH-YZ0UrC21XsC78Gozc8DdcOQ6l9ptzi2iOAtZ3ManB0k--c58D7KAz4bgfpsEdl7zaCuVhLljG_6vjjL_DHK6zzJGOJqpKvxsjxsURWd6ib6ZlXd_F73pUz-JA9DadjrtU6A3qf4iiSlwAT5Qp1tMMpaY7JnXt5AR6HFs9uMqIMCopF2BzEmmwRa4NWfgMeih7-P0qUO02f2lgXVIUxQcZpWxgS5_5_99we-Sxa8Mq4-OXqNM-2Ren5TVp2HKhJXkkF9DrrqbCVyjxy-xikUgbKlsgdYC34gSu2teTQKHNRIp2A4ttmwR33QVjMFKgQ3DPnLGH7Yw2gS1tVLkY4rpUvq_LpNzNExa9MVbyshJGTXl9kn6kU0yN3Sp2fTfxwwS8QkFJVSKU-XyVKhVfht5Q89vNlfLyL9ghH5xHzFn31bPLbEXADfFEJLCre2M0x326b3nS-3QpY6uswVKEGZOjDGqY7CkmT9jbS0V2BS8aAA7MdQCbj-a7lTZVj3Ir3Iha2vhxanlBn70NeVzdlyklDBHZUyF29WWpovyjFj-vUhp-DPDv3U8pxTjOPTIfaum7r_BedpK2fKLliWjzF7x8q2qwYJ-cRr5oHSajkw_nItCX0YV2r42nMFWnyBBUGPvSb0AWXds9EP9cZL5F8Xko6enxi8x7N8ayUDYkVo3YtE6s_pO9vg643fXjGvPEBjnvPbWq_kJoK1ZtU9ahP2xEPliTSArDbt-EDqv5UQ1X360NlDbiAn-ipswaovkDigbSZR9gzUFMlYA24MuTTT7Lxrtw472u3t5zzV_lbqyFPUcBmuoENOuEyuk880MICOR4-QUZjqxMVxzCEXWV3eJ_zqfwW5ZnbV508HHcn_n7KWPXxn2lPreUV6dfkR8jUjNWn211gH1tP961dNy0SEAAuxsd4Xcr9tZtkVnUzqko1DwMZROoXW5aTS1DKj00GXy5pFH5p7Tm24PI35ZFa5CME8ER1tR4XcucjAk5GKJ0A8qdjsu-OOiuaaHFgwUOeZV307UXzAu_Gf7quVimzhW-Lc4Y4zbG8IXFewJX6z_DSwjLL4iEmXtpHviFrmQGNRzUpk_8yCZdKk4pE8OiRadk6bLMyHs__lG09yimIS_5=w1165-h883"
            />
          </Flex>
        </Flex>
      </Flex>

      <Box
        bg="red"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["260px", "300px", "350px"]}
        h={"50px"}
      ></Box>
      <Box
        bg="green"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["280px", "350px", "400px"]}
        h={"50px"}
      ></Box>
      <Box
        bg="blue"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        w={["300px", "400px", "500px"]}
        h={"50px"}
      ></Box>
    </Flex>
  );
}
