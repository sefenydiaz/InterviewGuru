// button to form(new interview)
// can only be accessed after log-in
// need a button that jumps to form

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";

function Home() {
  return (
    <ChakraProvider>
      <Container maxW="md" centerContent mt={10}>
        <VStack spacing={6}>
          <Heading data-test="welcome-header" as="h1" size="xl">
            Welcome to InterviewGuru! Click below to begin.
          </Heading>
          <Link to="/form">
            <Button data-test="begin-button" colorScheme="gray" size="lg">
              Begin
            </Button>
          </Link>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default Home;
