import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUpForm from './components/SignUpForm';
import { initializeApp } from "firebase/app";
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
//Comment

//Config til firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8Rjv6wn64ZrNubtap3dlgK2SRkqgS3LA",
  authDomain: "my-app-a12df.firebaseapp.com",
  projectId: "my-app-a12df",
  storageBucket: "my-app-a12df.appspot.com",
  messagingSenderId: "767272821612",
  appId: "1:767272821612:web:524e0707313ce559348949"
};
//Eksporterer bruker
export default function App() {

//Bruker opprettes
const [user, setUser] = useState({ loggedIn: false });

const Stack = createStackNavigator();

  //Koden sikrer at kun én Firebase initieres ved bruk
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

//Predefinert metode som sikrer at bruekere er logged inn elle ikke
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

//onAuthStateChange() setter riktig bruker
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

//Vises ved første siden
  const GuestPage = () => {
    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginForm}
            />
            <Stack.Screen
                name="Signup"
                component={SignUpForm}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
//Sender bruker til ProfileScreen
  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
    backgroundColor: 'transparent',
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});