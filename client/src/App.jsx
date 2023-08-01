import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'; 
import Header  from './components/Header/index'
import Footer from './components/Footer/index'
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { InterviewProvider } from './utils/InterviewContext'
import { GlobalDataProvider } from "./utils/GlobalDataContext";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});



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
          <GlobalDataProvider>
          <div className="container">
            <Header />

            <div className="container">
            <Outlet 
            />
            </div>


            <Footer />
          </div>
          </GlobalDataProvider>
        </ApolloProvider>
      </ChakraProvider>
    </InterviewProvider>
  );
}

export default App;
