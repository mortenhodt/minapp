import Modal from "react-native-modal";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Styles from "../../../globalStyles/Styles";
import React from "react";

//Funksjon komponenent
function CredentialsComponent (props) {
//Styling - global styling
    return <Modal style={{minHeight: props.minHeight, justifyContent: "center"}}
                  isVisible={props.visible}>
        <View style={{
            ...Styles.modalContent,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40%"
        }}>
            <Text style={{fontSize: 20}}> Change Credentials </Text>
            <TextInput
                value={props.globalUser.username}
                placeholder={props.globalUser.username}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
                editable={false}
            />
            <TextInput
                value={props.value}
                placeholder={"Old Password"}
                secureTextEntry={true}
                onChangeText={props.onChangeText}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />
            <TextInput
                value={props.value1}
                placeholder={"New Password"}
                secureTextEntry={true}
                onChangeText={props.onChangeText1}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />
            <View style={stylesLocal.btnContainerLocal}>
                <Pressable
                    title={"Cancel"}
                    style={{...Styles.btnAuth, height: 50, width: "45%"}}
                    onPress={props.onPress}
                >
                    <Text style={{color: "white"}}>Cancel</Text>
                </Pressable>
                <Pressable
                    title={"Update"}
                    style={{...Styles.btnAuth, height: 50, width: "45%"}}
                    onPress={props.onPress1}
                >
                    <Text style={{color: "white"}}>Confirm</Text>
                </Pressable>
            </View>
        </View>
    </Modal>;
}
//Eksporter
export default CredentialsComponent;

//Align
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