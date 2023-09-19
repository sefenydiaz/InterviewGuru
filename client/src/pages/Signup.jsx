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
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

  const emailValidation = () => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regEx.test(formState.email) || formState.email === "") {
      setEmailMessage("*This is a required field. Please enter a vaild email.");
    } else {
      setEmailMessage("");
    }
  };

  const passwordValidation = () => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!regex.test(formState.password) || formState.password === "") {
      setPasswordMessage(
        "*This is a required field. Please meet the following password requirements: A minimum of 8 characters. At least one uppercase letter. At least one lower case letter. At least one numerical character. At least one special character."
      );
    } else {
      setPasswordMessage("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    nameValidation(event.target.value);
    emailValidation(event.target.value);
    passwordValidation(event.target.value);
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
              <Text data-test="name-alert" color="#FF0000" fontSize="md">
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
            <Text data-test="email-alert" color="#FF0000" fontSize="md">
              {emailMessage}
            </Text>
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
              <Text color="#FF0000" fontSize="md">
                {passwordMessage}
              </Text>
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
