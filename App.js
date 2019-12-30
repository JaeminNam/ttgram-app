import React,{useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from "apollo-boost";
import options from './apollo';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from "styled-components";
import styles from "./styles";
import NavController from './components/NavController';
import { AuthProvider } from './AutoContext';

export default function App() {
  const [loaded, setLoaded ]=useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try{
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync(require("./assets/logo.png"));
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...options
      }); 
      setLoaded(true);
      setClient(client);
    }catch(e){
      console.log(e);
    }
  };
  
  useEffect(() => {
    preLoad();
  },[]);

  return loaded && client  ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider>
          <NavController/>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading/>
  );
}