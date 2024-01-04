import { useState } from 'react'

import { Box, Flex, Button } from "@chakra-ui/react";
import AllRoutes from './Source/Router/AllRoutes';
import Copyright from './Source/Components/CopyRight';
import Footer from './Source/Components/Footer';

function App() {  
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
      <Footer />
      <Copyright />
   
    </Flex>
  );
}

export default App
