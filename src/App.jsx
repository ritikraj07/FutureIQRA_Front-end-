import { useState } from 'react'

import { Box, Flex, Button } from "@chakra-ui/react";
import AllRoutes from './Source/Router/AllRoutes';
import Copyright from './Source/Components/CopyRight';
import Footer from './Source/Components/Footer';
import { useSelector } from 'react-redux';

function App() {  
  let isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  // console.log(isLoggedIn);
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
  return (
    <Flex
      
      minH={"100vh"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <AllRoutes />
      {isLoggedIn && <Footer />}
      <Copyright />
   
    </Flex>
  );
}

export default App
