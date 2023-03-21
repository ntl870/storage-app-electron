import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom'
import { useLocalStorage } from './utils/tools'

const uploadLink = createUploadLink({ uri: import.meta.env.RENDERER_VITE_API_ENDPOINT })

const httpLink = createHttpLink({
  uri: import.meta.env.RENDERER_VITE_API_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
  const { getLocalStorage } = useLocalStorage()
  const token = getLocalStorage('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(ApolloLink.from([uploadLink, httpLink]))
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
