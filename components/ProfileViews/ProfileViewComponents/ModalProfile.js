import Modal from "react-native-modal";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Styles from "../../../globalStyles/Styles";
import {AntDesign} from "@expo/vector-icons";
import {formatDayOrMonth} from "../../helperfunctions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";

//Siste funksjon - Profil/bruker
//også kunne oppdatere
//+ Kanselere@// + kalender funksjon
function ModalProfile (props)  {
    return <Modal style={{minHeight: props.minHeight, justifyContent: "center"}}
                  isVisible={props.visible}>
        <View style={{
            ...Styles.modalContent,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40%"
        }}>
            <Text style={{fontSize: 20}}> Change My Info </Text>
            <TextInput
                value={props.value}
                placeholder={props.globalUser.firstname}
                onChangeText={props.onChangeText}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />
            <TextInput
                value={props.value1}
                placeholder={props.globalUser.lastname}
                onChangeText={props.onChangeText1}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />
            <Pressable style={{...Styles.btnCalender, ...stylesLocal.btnLocalDateTime}} title="Pick Birthdate"
                       onPress={(props.prop7)}>
                <AntDesign name="calendar" size={24} color="black"/>
                <Text
                    style={{marginLeft: 10}}>{props.day && props.month && props.year ? formatDayOrMonth(props.day) + "-" + formatDayOrMonth(props.month) + "-" + props.year : formatDayOrMonth(props.globalUser.birtDate) + "-" + formatDayOrMonth(props.globalUser.birthMonth) + "-" + props.globalUser.birthYear}</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={props.visible1}
                mode="date"
                onConfirm={props.onConfirm}
                onCancel={props.onCancel}
            />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                height: "30%"
            }}>
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
export default ModalProfile

//Lokal styling
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
})