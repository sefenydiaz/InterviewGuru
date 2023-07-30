import './App.css';
//import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'; 
import { Header } from './components/Header/index'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ChakraProvider >
        <ApolloProvider client={client}>
          <div className="guru">
            <Header />
            <Home />
            <Footer />
          </div>
        </ApolloProvider>
      </ChakraProvider>
  );
}

export default App;
