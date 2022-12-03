//import from other directories
import {AuthStack, ProfileTab} from "./components/navigator/Navigators";
import {NavigationContainer} from "@react-navigation/native";
import firebase from "firebase/compat";
import React, { useEffect, useState} from "react";
import {StateProvider} from "./components/AppContext";

//now using a real time database
const firebaseConfig = {

  apiKey: "AIzaSyA8Rjv6wn64ZrNubtap3dlgK2SRkqgS3LA",
  authDomain: "my-app-a12df.firebaseapp.com",
  databaseURL: "https://my-app-a12df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-a12df",
  storageBucket: "my-app-a12df.appspot.com",
  messagingSenderId: "767272821612",
  appId: "1:767272821612:web:524e0707313ce559348949"
};




export default function App() {
  //Creating a user state variable
  //const {globalUser, setGlobalUser } = useContext(AppContext);
  const [user, setUser] = useState({ loggedIn: false });

  //securing that only one firebase is running
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //Predefined method that secures that one user is logged in or not
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }


//onAuthStateChange() setting the right user
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //this is what the user see, login or signup
  const GuestPage = () => {
    return (
        <NavigationContainer>
          <AuthStack/>
        </NavigationContainer>
    );
  }
  const Profile = () => {
    return (
        <NavigationContainer><ProfileTab/></NavigationContainer>
    );
  }
  return (user.loggedIn ? <StateProvider><Profile/></StateProvider> :<StateProvider><GuestPage/></StateProvider>) ;

}