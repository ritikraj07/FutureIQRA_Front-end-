import { Flex, Text } from "@chakra-ui/react";
import AllRoutes from "./Source/Router/AllRoutes";
import Copyright from "./Source/Components/CopyRight";
import Footer from "./Source/Components/Footer";

import { Helmet } from "react-helmet";

function App() {
  

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  return (
    <Flex minH={"100vh"} flexDir={"column"} justifyContent={"space-between"}>
      <Helmet>
        <title>Future IQRA</title>
        <meta
          name="description"
          content="Unlock your potential with our Professional Skill Development Program, tailored for career growth. Navigate daily life effortlessly with our insightful Life Hack Tips and Tricks. Join us in the pursuit of excellence, mastering skills for success and simplifying everyday challenges."
        />
        <link
          rel="canonical"
          type="image/png"
          sizes="512x512"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
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
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://65b51b3151be0ca5adcbbb85--joyful-kheer-008761.netlify.app/Accets/favicon.png"
        />
      </Helmet>
      <AllRoutes />
      <Footer />
      <Copyright />
    </Flex>
  );
}

export default App;
