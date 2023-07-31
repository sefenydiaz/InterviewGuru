import './App.css';


import { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'; 
import Header  from './components/Header/index'
import Footer from './components/Footer/index'
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//set up context
const InterviewContext = createContext();

const InterviewProvider = (props) => {
  const [questionId, setQuestionId] = useState()

  const updateId = (newId) => {
    setQuestionId(newId) 
    
  }
  return (
    <InterviewContext.Provider 
    value={{ questionId, updateId}}  >
      {props}
      </InterviewContext.Provider>
  )
}

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


//put in user state to outlet using props
function App() {
  
  return (
    <InterviewProvider>
      <ChakraProvider >
        <ApolloProvider client={client}>
          <div className="container">
            <Header />

            <div className="container">
            <Outlet 
            />
            </div>


            <Footer />
          </div>
        </ApolloProvider>
      </ChakraProvider>
    </InterviewProvider>
  );
}

export default App;
