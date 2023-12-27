
import { Route, Routes, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import {HamburgerIcon} from '@chakra-ui/icons'
import { MdSpaceDashboard, MdReport, MdQuestionAnswer } from "react-icons/md";
import { SiCoursera } from "react-icons/si";

export default function AdminRouter() {
  const navigate = useNavigate();

    return (
      <Flex bg="white" minH={window.innerHeight}>
        <Flex
          bg={"#393E4F"}
          direction={"column"}
          height={["inherit"]}
          w={["20%"]}
          px={["3px", "4px", "5px"]}
          py={["50px"]}
          color={"white"}
          justifyContent={"flex-start"}
          alignItems={["center"]}
          display={["none", "block"]}
          // border={'1px solid red'}
        >
          <Box className="navLinkContainer">
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "activeLink" : "inActiveLink"
              }
              to={"/admin/dashboard"}
            >
              Dashboard
            </NavLink>
            <br></br>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "activeLink" : "inActiveLink"
              }
              to={"/admin/report"}
            >
              Report
            </NavLink>
            <br></br>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "activeLink" : "inActiveLink"
              }
              to={"/admin/q&a"}
            >
              Question
            </NavLink>
            <br></br>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? "activeLink" : "inActiveLink"
              }
              to={"/admin/course"}
            >
              Course
            </NavLink>
            <br></br>
          </Box>
        </Flex>

        <Box
          zIndex={100}
          mt={"10px"}
          ml={"10px"}
          pos={"fixed"}
          display={["block", "none"]}
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              bg={"white"}
            >
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/report")}>
                {" "}
                Report{" "}
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/q&a")}>
                Question{" "}
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/course")}>
                Course
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box
          w={"100%"}
          // p={["10px"]}
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
          <Outlet />
        </Box>
      </Flex>
    );
}








  //  <NavLink to={"/admin/report"} style={{ width: "100%" }}>
  //           <Flex alignItems={"center"}>
  //             {/* <MdReport style={{ marginRight: "20px" }} /> */}
  //             <Text color={"white"} display={["none", "none", "block"]}>
  //               Reports
  //             </Text>
  //           </Flex>
  //         </NavLink>

  //         <NavLink to={"/admin/q&a"} style={{ width: "100%" }}>
  //           <Flex alignItems={"center"}>
  //             {/* <MdQuestionAnswer style={{ marginRight: "20px" }} /> */}
  //             <Text color={"white"} display={["none", "none", "block"]}>
  //               Questions
  //             </Text>
  //           </Flex>
  //         </NavLink>
  //         <NavLink to={"/admin/course"} style={{ width: "100%" }}>
  //           <Flex alignItems={"center"}>
  //             {/* <SiCoursera style={{ marginRight: "20px" }} /> */}
  //             <Text color={"white"} display={["none", "none", "block"]}>
  //               Course
  //             </Text>
  //           </Flex>
  //         </NavLink>