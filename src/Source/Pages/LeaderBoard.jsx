import { useEffect, useState } from "react";

import { Box, Heading, Flex, Text, useToast } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TopLeaders from "../Components/TopLeaders";
import LeaderList from "../Components/LeaderList";
import { useNavigate } from "react-router-dom";
import { GetRequest } from "../Services/ApiCall";
import { useSelector } from "react-redux";
import Copyright from "../Components/CopyRight";
import Navbar from "../Components/Navbar";

export default function LeaderBoard() {
  const url = import.meta.env.VITE_API_URL;
  const { phone,name, wallet, image } = useSelector((state) => state.User)
  const [current_user_rank, set_current_user_rank] = useState(1)
  const toast = useToast()
  const navigate = useNavigate()
  const [leaderboard, setLeaderBoard] = useState([])

  useEffect(() => {
    GetLeaders()

  }, [])
  
  function GetLeaders() {
    GetRequest(`${url}user/leaderboard`)
      .then((res) => {
        if (res.status) {
          setLeaderBoard(res.data)
        } else {
          toast({
            title: 'something went wrong',
            status: 'error',
            duration: 3000
          })
        }
      // console.log(res)
    })
  }







  return (
    <Box
    // height={'100%'}
    // backgroundColor={"#2658e6"}
    // minH={'100vh'}
    >
      <Navbar />

      <Flex
        // bg={"white"}
        p={["1px", "2px", "5px"]}
        // bgGradient="linear(to-b, white, #2658e6)"

        justifyContent={["center", "center", "center", "space-around"]}
        alignItems={["center", "center", "center", "center", "start"]}
        flexDir={["column", "column", "column", "column", "row"]}
      >
        <Box>
          {leaderboard.length > 2 && <TopLeaders leaderboard={leaderboard} />}
        </Box>
        <Box
          w={["95%", "90%", "85%", "70%", "50%", "50%"]}
          my={["40px", "30px", "30px", "20px", "1px"]}
          bg="#32085F"
          p={"10px"}
          borderRadius={"20px"}
          h="100vh"
          overflowY="scroll"
          sx={{
            /* Hide scrollbar */
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for Chrome, Safari, Opera
            },
            "&": {
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
            },
          }}
        >
          <Text
            fontSize={"2xl"}
            fontWeight={"extrabold"}
            color={"gold"}
            textAlign={"center"}
          >
            {" "}
            Meet Our Leaders{" "}
          </Text>
          <Box>
            {leaderboard?.map((u, i) => {
              if (u.phone == phone) {
                return (
                  <LeaderList
                    key={u._id}
                    name={u.name}
                    money={u.wallet}
                    image={u.image}
                    rank={i + 1}
                  />
                );
              }
            })}

            {leaderboard?.map((u, i) => {
              if (u.phone == phone) {
                return;
              }
              return (
                <LeaderList
                  key={u._id}
                  name={u.name}
                  money={u.wallet}
                  image={u.image}
                  rank={i + 1}
                />
              );
            })}
          </Box>
        </Box>
      </Flex>
      {/* <Copyright /> */}
    </Box>
  );
}
