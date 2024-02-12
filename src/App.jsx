import { Flex, Text, Box } from "@chakra-ui/react";
import AllRoutes from "./Source/Router/AllRoutes";
import Copyright from "./Source/Components/CopyRight";
import Footer from "./Source/Components/Footer";

import { Helmet } from "react-helmet";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   window.location.href = "https://www.google.com";
  // }, []);

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  return (
    <Flex minH={"100vh"} flexDir={"column"} justifyContent={"end"}>
      <Helmet>
        <title>Future IQRA</title>
        <meta
          name="description"
          content="Unlock your potential with our Professional Skill Development Program. Join us for career growth and navigate daily life effortlessly with insightful Life Hack Tips and Tricks."
        />

        <link
          rel="shortcut icon"
          type="image/png"
          sizes="512x512"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
      </Helmet>
      <AllRoutes />
      <Box>
        <Footer />
        <Copyright />
        
      </Box>
    </Flex>
  );
}

export default App;
