import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/header'
import Screen from './components/screen'

import Auth from './utils/auth'
import Search from './pages/search'
import Trainer from './pages/trainer';
import Login from './pages/login';
import { ThemeProvider } from './ctx/themeContext'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Screen>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/trainer/:id" element={<Trainer />} />
            </Routes>
          </Screen>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App;
