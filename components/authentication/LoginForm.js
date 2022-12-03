import {Text, View, TextInput, TouchableOpacity, useWindowDimensions} from "react-native";
import Styles from "../../globalStyles/Styles";
import {useContext, useState} from "react";
import firebase from "firebase/compat";
import {AppContext} from "../AppContext";



function Login({navigation}) {
//Instantiering af statevariabler til brug i appen
    const [globalUser, setGlobalUser] = useContext(AppContext)
    const height = useWindowDimensions().height
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Comtroller til at styre navigering mellem sider i stacknavigator.
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    /*
    * Handlesubmit.
    * 1. Først forsøges login ved brug af en prædefineret sign-in metode, der modtager to arguemnter; email og password
    * 2. Dernæst foretages et kald til en tilkoblede realtime database.
    *    Metoden henter alle brugere og leder efter den bruger, som har en email tilsvarende til den mailadresse, som er gemt i email-variablen
    *    Når brugeren er fundet, hentes alle de dertilhørende oplysninger, hvorefter disse gemmes i den globale brugervariabel.
    * */
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(username, password);
            firebase
                .database()
                .ref('/users')
                .on('value', snapshot => {
                    if (snapshot.val()) {
                        const userAndKeys = Object.entries(snapshot.val())
                        const user = userAndKeys.find(item => (item[1].username).toUpperCase() === username.toUpperCase())
                        setGlobalUser({
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
            //Error handling er ikke implementeret
            console.log(error.message)
        }
    }

    //Layout af app
    return (
        <View style={{...Styles.container, minHeight: height}}>


            <View style={Styles.subContainer} >
            
          <Text style={Styles.title}>
                DockIt
            </Text>
        
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
                    style={{...Styles.btnAuth, backgroundColor: 'white', borderWidth: 0.1, borderColor: 'black'}}
                    onPress={() => navController(navigation, 'SignUp') }
                >
                    <Text>Sign Up here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Login