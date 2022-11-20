import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Alert,
    useWindowDimensions,
    ActivityIndicator
} from "react-native";
import Styles from "../../globalStyles/Styles";
import {AppContext} from "../AppContext";
import React, {useContext, useState} from "react";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import firebase from "firebase/compat";
import ModalProfile from "./ProfileViewComponents/ModalProfile";
import CredentialsComponent from "./ProfileViewComponents/CredentialsComponent";
import DetailsComponent from "./ProfileViewComponents/DetailsComponent";
import Buttons from "./ProfileViewComponents/Buttons";


function HomeScreen() {
    const height = useWindowDimensions().height
    const [isVisibleModalProfile, setProfileModalVisibility] = useState(false)
    const [isVisibleModalCredentials, setCredentialsModalVisibility] = useState(false)
    const [globalUser, setGlobalUser] = useContext(AppContext)
    const [password, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newFirstname, setNewFirstname] = useState("")
    const [newLastname, setNewLastname] = useState("");
    const [year, setNewYear] = useState(null)
    const [day, setNewDay] = useState(null)
    const [month, setNewMonth] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleConfirm = (date) => {
        setNewDay(date.getDate())
        setNewMonth((date.getMonth())+1)
        setNewYear(date.getFullYear())
        setShowDatePicker(false)
    };

    const updateGlobalUser = () => {
        setGlobalUser({
            id: globalUser.id,
            birtDate: day ? day: globalUser.birtDate,
            birthMonth: month ? month: globalUser.birthMonth,
            birthYear: year ? year: globalUser.birthYear,
            firstname: newFirstname ? newFirstname : globalUser.firstname,
            lastname: newLastname ? newLastname : globalUser.lastname,
            username: globalUser.username,
            countries:globalUser.countries.length > 0 ? globalUser.countries : []
        })
    }


    const cleanFields = () => {
        setNewPassword("")
        setNewFirstname("")
        setNewLastname("")
        setNewDay(null)
        setNewMonth(null)
        setNewYear(null)
        setOldPassword("")
    }

    const updateCredentials = () => {
        try {
            const user = firebase.auth().currentUser
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                oldPassword
            );
            user.reauthenticateWithCredential(credential).then((val)  => {
                val.user.updatePassword(password).then((r)=>
                    setCredentialsModalVisibility(false))
                Alert.alert("success")
            })

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

    }

    const updateUser = () => {
        const userDetails = {
            birtDate: day ? day: globalUser.birtDate,
            birthMonth: month ? month: globalUser.birthMonth,
            birthYear: year ? year: globalUser.birthYear,
            firstname: newFirstname ? newFirstname : globalUser.firstname,
            lastname: newLastname ? newLastname : globalUser.lastname,
            username: globalUser.username,
            countries:globalUser.countries.length > 0 ? globalUser.countries : []
        }
        try {
            firebase
                .database()
                .ref(`/users/${globalUser.id}`)
                .update(userDetails);
            updateGlobalUser()
            setProfileModalVisibility(false)
            Alert.alert("Update was succesfull ")
            cleanFields()

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    const handleLogOut = async () => {
        setGlobalUser({ id: null, birtDate: null, birthMonth: null, birthYear: null, firstname: null, lastname: null, username: null, countries: []});
        await firebase.auth().signOut()
    };

    if (globalUser.username != null) {
        return (
            <View style={{...Styles.container, justifyContent: 'flex-start'}}>
                <Text style={{...Styles.title, marginBottom: 0, marginTop: 100}}>Profile Page!</Text>
                <View style={{margin: 10}}>
                    <View style={Styles.circle}><MaterialIcons
                        name="face"
                        size={50} color="black"/></View>
                </View>
                <DetailsComponent globalUser={globalUser}/>
                <Buttons onPress={() => setProfileModalVisibility(true)}
                         onPress1={() => setCredentialsModalVisibility(true)}
                         onPress2={() => handleLogOut()}/>

                <ModalProfile minHeight={height}
                              visible={isVisibleModalProfile}
                              value={newFirstname}
                              globalUser={globalUser}
                              onChangeText={(firstname) => setNewFirstname(firstname)}
                              value1={newLastname}
                              onChangeText1={(lastname) => setNewLastname(lastname)}
                              prop7={() => setShowDatePicker(true)}
                              day={day}
                              month={month}
                              year={year}
                              visible1={showDatePicker}
                              onConfirm={handleConfirm}
                              onCancel={() => setShowDatePicker(false)}
                              onPress={() => setProfileModalVisibility(false)}
                              onPress1={() => updateUser()}/>


                <CredentialsComponent minHeight={height}
                                      visible={isVisibleModalCredentials}
                                      globalUser={globalUser}
                                      value={oldPassword}
                                      onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                                      value1={password}
                                      onChangeText1={(newPass) => setNewPassword(newPass)}
                                      onPress={() => setCredentialsModalVisibility(false)}
                                      onPress1={() => updateCredentials()}/>


            </View>
        );
    } else return <View style={Styles.container} ><ActivityIndicator size="large" color="#0000ff" /><Text>Loading</Text></View>
}


export default HomeScreen

const stylesLocal = StyleSheet.create({
    btnLocalDateTime: {
        width: 200,
        justifyContent: 'flex-start',
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        alignSelf: 'center',
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 2
    },
    modalTextInputLocal: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: 40
    },
    btnContainerLocal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    }
})