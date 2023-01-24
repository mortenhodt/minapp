import {Text, View, TextInput, TouchableOpacity, useWindowDimensions} from "react-native";
import Styles from "../../globalStyles/Styles";
import {useContext, useState} from "react";
import firebase from "firebase/compat";
import {AppContext} from "../AppContext";



function Login({navigation}) {
//Instantiering af statevariabler til bruk i appen
    const [globalUser, setGlobalUser] = useContext(AppContext)
    const height = useWindowDimensions().height
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Controller til å styre navigering mellem sider i stacknavigator.
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    //håndterer submitten
    const handleSubmit = async () => {
        try {
            //Sjekker om de er bruker i systemet
            await firebase.auth().signInWithEmailAndPassword(username, password);
            firebase
                .database()
                .ref('/users')
                .on('value', snapshot => {
                    if (snapshot.val()) {
                        const userAndKeys = Object.entries(snapshot.val())
                        //Tilfelle de skriver brukernavnet med feil bruk av store bokstaver
                        const user = userAndKeys.find(item => (item[1].username).toUpperCase() === username.toUpperCase())
                        setGlobalUser({
                            //Setter brukeren, skal kunne endre senere - derfor de blir satt opp som variabler
                            id: user[0],
                            birtDate: user[1].birtDate,
                            birthMonth: user[1].birthMonth,
                            birthYear: user[1].birthYear,
                            firstname: user[1].firstname,
                            lastname: user[1].lastname,
                            username: user[1].username,
                            countries: Object.keys(user[1]).includes('countries') ? user[1].countries : []
                        })
                    }

                });
        } catch (error){
            //Logger kun erroren
            console.log(error.message)
        }
    }

    //Layout af app
    return (
        <View style={{...Styles.container, minHeight: height}}>
            <View style={Styles.subContainer} >
                <Text style={Styles.title} >Login </Text>
                <TextInput
                    value={username}
                    onChangeText={(username) => setUsername( username)}
                    placeholder={'Username'}
                    style={Styles.input}
                />

                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword( password )}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={Styles.input}
                />
                <TouchableOpacity
                    title={'Login'}
                    style={Styles.btnAuth}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{color: 'white'}}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{marginTop: '2%'}}>Not a User?</Text>
                <TouchableOpacity
                    title={'Sign up here'}
                    //Sign up styling
                    style={{...Styles.btnAuth, backgroundColor: 'white', borderWidth: 0.1, borderColor: 'black'}}
                    onPress={() => navController(navigation, 'SignUp') }
                >
                    <Text>Sign Up here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
//Eksporterer

export default Login