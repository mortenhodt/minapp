import React,  { useState, createContext } from 'react';
import {View} from "react-native";

const AppContext = createContext();

const StateProvider = (props) => {
    const [globalUser, setGlobalUser] = useState({ id: null, birtDate: null, birthMonth: null, birthYear: null, firstname: null, lastname: null, username: null, countries: []});
    return (
        <AppContext.Provider value={[globalUser, setGlobalUser]}>{props.children}</AppContext.Provider>
    )
}
export {AppContext, StateProvider}