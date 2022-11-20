import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

//ExploreScreen komponenten tager en prop med og printer indholdet af denne prop i en <Text>
function SettingsScreen({prop}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop}</Text>
        </View>
    );
}

export default SettingsScreen

//Lokal styling til brug i ExploreScreen
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'white',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    text: {
        fontSize: 20,
    },
});