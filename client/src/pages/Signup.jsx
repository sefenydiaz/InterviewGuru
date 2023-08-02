import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, gql } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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
} from '@chakra-ui/react';


const ADD_USER = gql`
mutation AddUser(
  $name: String!
  $email: String!
  $password: String!
  ) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }`;

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
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
        <Heading as="h1" size="lg">
          Sign Up
        </Heading>
        <Divider />
        {data ? (
          <Text>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </Text>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl id="name">
              <FormLabel>Name:</FormLabel>
              <Input
                placeholder="Your name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email:</FormLabel>
              <Input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password:</FormLabel>
              <Input
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button type="submit" w="100%" mt={4}>
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
