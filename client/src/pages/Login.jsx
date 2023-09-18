import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useGlobalData } from "../utils/GlobalDataContext";
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
} from "@chakra-ui/react";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const { globalData, updateGlobalData } = useGlobalData();

  const emailValidation = () => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regEx.test(formState.email || formState.email === "")) {
      setEmailMessage(
        "*These are required fields. Please enter a valid email."
      );
    } else {
      setEmailMessage("");
    }
  };

  const passwordValidation = () => {
    const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/;

    if (!regEx.test(formState.password || formState.password === "")) {
      setPasswordMessage(
        "*This is a required field. Please enter a valid password."
      );
    } else {
      setPasswordMessage("");
    }
  };

  //useMutation hook to use login mutation
  const [login, { data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    emailValidation(event.target.value);
    passwordValidation(event.target.value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      updateGlobalData(data.login);
      console.log(globalData);
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
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
        <Heading data-test="login-form-header" as="h1" size="lg">
          Login
        </Heading>
        <Divider />
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl data-test="email-input" id="email">
              <FormLabel>Email: </FormLabel>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <p>{emailMessage}</p>
            </FormControl>
            <FormControl data-test="password-input" id="password">
              <FormLabel>Password: </FormLabel>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <p>{passwordMessage}</p>
            </FormControl>
            <Button
              data-test="login-button"
              mt={4}
              w="100%"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Login!
            </Button>
          </form>
        )}
      </VStack>
    </Box>
  );
}

export default Login;
