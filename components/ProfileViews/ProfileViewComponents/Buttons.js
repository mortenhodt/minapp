import {Pressable, Text} from "react-native";
import Styles from "../../../globalStyles/Styles";
import React from "react";
//Funksjon for knapp
//Endre profil
//Endre Passord
// + Log out
function Buttons (props) {
    return <>
        <Pressable
            title={"Change profile"}
            style={Styles.btnAuth}
            onPress={props.onPress}
        >
            <Text style={{color: "white"}}>Change info</Text>
        </Pressable>
        <Pressable
            title={"Change Password"}
            style={{...Styles.btnAuth, marginTop: 5}}
            onPress={props.onPress1}
        >
            <Text style={{color: "white"}}>Change Password</Text>
        </Pressable>
        <Pressable
            title={"Log out"}
            style={{...Styles.btnAuth, marginTop: 5}}
            onPress={props.onPress2}
        >
            <Text style={{color: "white"}}>Log out</Text>
        </Pressable>
    </>;
}
//Eksporter funksjon
export default Buttons