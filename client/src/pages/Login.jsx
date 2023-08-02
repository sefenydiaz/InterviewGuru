import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
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
} from '@chakra-ui/react';

const LOGIN_USER = gql`
mutation Login(
  $email: String!
  $password: String!
  ) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
  `;


function Login () {
  const [formState, setFormState] = useState({ email: '', password: '' });
  //useMutation hook to use login mutation
  const [login, { data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
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
      <Heading as="h1" size="lg">
        Login
      </Heading>
      <Divider />
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <FormControl id="email">
                  <FormLabel>Email: </FormLabel>
                    <Input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password: </FormLabel>
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                </FormControl>
                <Button
                  colorScheme="blue"
                  mt={4}
                  w="100%"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login!
                </Button>
              </form>
            )}
              </VStack>
              </Box>
          )}

          


export default Login;
