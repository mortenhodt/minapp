import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SignUpForm() {
    //Instantiering af state-variabler, som skal benyttes i SignUpForm
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

//Her initieres brukeropprettelsen
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };


    //Google egne create user funksjon
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

//Oppretter inputfields
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

//Padding og styling
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});

//Eksporteres SignUpForm og henter i App.js
export default SignUpForm