import { Box, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box p="4" minH={'100vh'} bg={'white'} >
      <Heading as="h2" mb="6">
        Welcome to futureIQRA.in
      </Heading>
      <Text mb="6">
        Welcome to futureIQRA.in, a revolutionary platform designed to
        revolutionize online learning. Our story begins with the dynamic
        collaboration between Ritik Raj, a seasoned developer, and Abdul Barik,
        the visionary mind behind this educational endeavor. With a shared
        passion for education's transformative power, they embarked on a mission
        to redefine e-learning experiences.
      </Text>
      <Text mb="6">
        Ritik Raj, armed with technical prowess and an unyielding commitment to
        innovation, set out to engineer a digital ecosystem that transcends
        traditional learning barriers. His expertise in web development, coupled
        with a forward-thinking approach, laid the foundation for futureIQRA.in
        – an embodiment of cutting-edge technology seamlessly integrated into an
        educational landscape.
      </Text>
      {/* ... Other sections go here */}
      <Text mb="6">
        As we continue on this transformative journey, our commitment to
        educational excellence remains unwavering. Join us at futureIQRA.in and
        embark on a learning expedition where knowledge knows no bounds, and
        possibilities are limitless.
      </Text>
    </Box>
  );
};

export default AboutUs;
