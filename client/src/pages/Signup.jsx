import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, gql } from "@apollo/client";

import Auth from "../utils/auth";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Divider,
  VStack,
  Text,
} from "@chakra-ui/react";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [nameMessage, setNameMessage] = useState("");

  const nameValidation = () => {
    const regEx = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regEx.test(formState.name) || formState.name === "") {
      setNameMessage(
        "*This is a required field. Please enter first and last name."
      );
    } else {
      setNameMessage("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    nameValidation(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      m="auto"
      mt={10}
      boxShadow="md"
    >
      <VStack spacing={6}>
        <Heading data-test="signup-header" as="h1" size="lg">
          Sign Up
        </Heading>
        <Divider />
        {data ? (
          <Text>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </Text>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl data-test="name-input" id="name">
              <FormLabel>Name: </FormLabel>
              <Input
                placeholder="Your name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                required
              />
              <Text color="#FF0000" fontSize="md">
                {nameMessage}
              </Text>
            </FormControl>
            <FormControl data-test="email-input" id="email">
              <FormLabel>Email: </FormLabel>
              <Input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl data-test="password-input" id="password">
              <FormLabel>Password: </FormLabel>
              <Input
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button data-test="submit-button" type="submit" w="100%" mt={4}>
              Submit
            </Button>
          </form>
        )}

        {error && (
          <Box my={3} p={3} bg="red.500" color="white">
            {error.message}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Signup;
