import {
    Text,
    TextInput,
    useWindowDimensions,
    View,
    Pressable
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Styles from "../../globalStyles/Styles";
import {useContext, useState} from "react";
import firebase from "firebase/compat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formatDayOrMonth} from "../helperfunctions";
import {AppContext} from "../AppContext";


function SignUp({navigation}) {
//Instatering af relevante statevaribler.Bidm mærke i måden hvorpå man henter en globalStyles bruger, defineret i vores AppContext.
    const [globalUser, setGlobalUser] = useContext(AppContext)
    const height = useWindowDimensions().height
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Comtroller til at styre navigering mellem sider i stacknavigator.
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    // Comtroller til at styre fremvisning af datePicker komponent .

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Comtroller til at styre fremvisning af datePicker komponent .
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Hjælper metode til at populerer felter koblet til den globale bruger
    const createUser = () => {
        return {birtDate: day, birthMonth: month, birthYear: year, firstname: firstname, lastname: lastname, username: username }
    }


    // Opdaterer alle statevariabler, som relaterer sig til datoer
    const handleConfirm = (date) => {
        setDay(date.getDate())
        setMonth((date.getMonth())+1)
        setYear(date.getFullYear())
        hideDatePicker();
    };


    /*
    * Metoden herunder håndterer oprettelse af brugere ved at anvende en prædefineret firebase metode
    * signInWithEmailAndPassword tager en mail og et password med som argumenter og foretager et asynkront kald, der eksekverer en brugeroprettelse i firebase
    * Til sidst populeres felterne for den globale bruger med de indtastede oplysningerne i formularen
    */
    const handleSubmit = async() => {
        const user = createUser()
        try {
            await firebase.auth().createUserWithEmailAndPassword(username, password);
            firebase
                .database()
                .ref('/users/')
                .push(user).then(r => {
                setGlobalUser({
                    id: r.getKey(),
                    birtDate: day,
                    birthMonth: month,
                    birthYear: year,
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    countries: []
                })
            })

        } catch (error) {
            //Error handling er ikke implementeret

            console.log(`Error: ${error.message}`);
        }
    }

    //Layout af app
    return (
        <View style={{...Styles.container, minHeight: height, borderWidth: 1, textAlign: 'center' }}>
            <View style={Styles.subContainer} >
                <Text style={Styles.title} >Welcome! </Text>
                <TextInput
                    value={firstname}
                    onChangeText={(firstname) => setFirstname( firstname )}
                    placeholder={'Firstname'}
                    style={Styles.inputV2}
                />
                <TextInput
                    value={lastname}
                    onChangeText={(lastname) => setLastname( lastname )}
                    placeholder={'Lastname'}
                    style={Styles.inputV2}
                />
                <Pressable style={Styles.btnCalender} title="Pick Birthdate" onPress={showDatePicker}>
                    <AntDesign name="calendar" size={24} color="black" />
                    <Text style={{fontSize: 17, marginLeft: 2}} >Date Of Birth</Text>
                </Pressable>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Text style={{alignSelf: 'stretch', marginBottom: 20, borderBottomWidth: 1}} > {day === "" || month === "" || year === "" ? "Date not chosen" : formatDayOrMonth(day)  +"-" + formatDayOrMonth(month) + "-" + year }</Text>
                <TextInput
                    value={username}
                    onChangeText={(username) => setUsername( username )}
                    placeholder={'E-Mail'}
                    style={Styles.inputV2}
                />
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder={'Create password'}
                    secureTextEntry={true}
                    style={Styles.inputV2}
                />
                <Pressable
                    title={'Sign Up'}
                    style={Styles.btnAuth}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{color: 'white'}} >Sign Up</Text>
                </Pressable>

                <Pressable
                    title={'Back to Login'}
                    style={{...Styles.btnAuth, backgroundColor: 'white', borderWidth: 0.1, borderColor: 'black', marginTop: '4%'}}
                    onPress={() => navController(navigation, 'Login') }
                >
                    <Text>Back To Login</Text>
                </Pressable>
            </View>
        </View>
    );
}
export default SignUp