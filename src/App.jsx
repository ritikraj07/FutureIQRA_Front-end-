import { Flex } from "@chakra-ui/react";
import AllRoutes from "./Source/Router/AllRoutes";
import Copyright from "./Source/Components/CopyRight";
import Footer from "./Source/Components/Footer";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

function App() {
  let isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  // console.log(isLoggedIn);
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  return (
    <Flex minH={"100vh"} flexDir={"column"} justifyContent={"space-between"}>
      <Helmet>
        <title>Future IQRA</title>
        <meta
          name="description"
          content="Embark on a transformative learning journey with futureIQRA.in – a revolutionary platform crafted by Ritik Raj and Abdul Barik. Explore cutting-edge technology, innovative learning, and a commitment to educational excellence. Join us where knowledge knows no bounds, and possibilities are limitless."
        />
        <link
          rel="canonical"
          type="image/png"
          sizes="512x512"
          href="/src/Source/Assets/favicon_io/android-chrome-512x512.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="512x512"
          href="/src/Source/Assets/favicon_io/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/src/Source/Assets/favicon_io/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/src/Source/Assets/favicon_io/android-chrome-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/src/Source/Assets/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/src/Source/Assets/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/src/Source/Assets/favicon_io/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/src/Source/Assets/favicon_io/site.webmanifest"
        />
      </Helmet>
      <AllRoutes />
      {isLoggedIn && <Footer />}
      <Copyright />
    </Flex>
  );
}

export default App;
