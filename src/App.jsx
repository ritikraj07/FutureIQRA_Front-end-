import { useState } from 'react'

import { Box, Flex, Button } from "@chakra-ui/react";
import AllRoutes from './Source/Router/AllRoutes';
import Copyright from './Source/Components/CopyRight';

function App() {  
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
  return (
    <Flex position={'relative'}
      minH={"100vh"}
      flexDir={"column"} justifyContent={"space-between"}>
      <AllRoutes />
      <Copyright />
      {/* <Button
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        isLoading
        

        // spinner={<BeatLoader size={8} color="white" />}
      >
        Click me
      </Button> */}
    </Flex>
  );
}

export default App
