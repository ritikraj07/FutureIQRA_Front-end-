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
      height={'100%'}
      backgroundColor={"#2658e6"}
      minH={'100vh'}
    >
     <Navbar />

      <Flex
        // bg={"white"}
        p={['1px','2px','5px']}
        bgGradient="linear(to-b, white, #2658e6)"
        justifyContent={["center", "center", "center", "space-around"]}
        alignItems={["center","center","center","center", "start"]}
        flexDir={["column", "column", "column", "column", "row" ]}
      >
        {leaderboard.length > 2 && <TopLeaders leaderboard={leaderboard} />}
        <Box
          w={["95%", "90%", "85%", "70%", "50%", "50%"]}
          my={["40px", "30px", "30px", "20px", "1px"]}
          bg="#32085F"
          p={"10px"}
          borderRadius={"20px"}
          h={'100%'}
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
          <Box
            h={'100%'}
            overflowY={"hidden"}
            overflow={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent", // Set the thumb color to transparent
              },
            }}
          >
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
