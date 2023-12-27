import { Box, Heading } from "@chakra-ui/react";

const ErrorBox = () => {
    return (
        <Box
            bg="red.200"
            p={8}
            boxShadow="lg"
            borderRadius="md"
            textAlign="center"
            maxW="400px"
            m="auto"
            mt={20}
        >
            <Heading as="h2" size="lg" color="red.800">
                Something went wrong
            </Heading>
        </Box>
    );
};

export default ErrorBox;
