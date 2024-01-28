import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect the user to a different page on button click
    navigate("/");
  };

  return (
    <Box bg={'white'} h={['95vh']} p={10} textAlign="center">
      <Heading as="h1" fontSize="3xl" mb={4}>
        Unauthorized Access
      </Heading>
      <Text fontSize="xl" mb={6}>
        Oops! It seems you do not have permission to view this page.
      </Text>
      <Button
        onClick={handleRedirect}
        colorScheme="teal"
        variant="solid"
        size="lg"
      >
        Go Home
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
