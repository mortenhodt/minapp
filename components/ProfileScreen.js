import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


import SettingsScreen from "./navigator/SettingsScreen";
import FavouritesScreen from "./navigator/FavouritesScreen.js";
import ExploreScreen from "./navigator/ExploreScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
const favouriteScreenText = "Your favourites"
const settingsScreenText = "Velkommen!"

function ProfileScreen () {

    //arrow function som håndterer en async log ut handling
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

//Hvis man ikke finner en bruker
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    //I return() håndterer vi en logout req.
    return (
        <View style={styles.container} >
            <Text>Current user: {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ],
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Favourites') {
                            return (
                                <Ionicons
                                    name='settings-outline'
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === 'Explore') {
                            return (
                                <Ionicons
                                    name='search-outline'
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                        else{
                            return (
                                <Ionicons
                                    name='heart-outline'
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                    },
                })}
                >
                    <Tab.Screen name="Explore" children={()=><ExploreScreen prop={settingsScreenText}/>} />
                    <Tab.Screen name="Favourites" children={()=><FavouritesScreen prop={favouriteScreenText}/>} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>

    );

}

//Legger på noe padding, styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

//eksporteres og hentes i App.js
    export default ProfileScreen