import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

//FavouritesScreen komponenten tager en prop med og printer indholdet af denne i en <Text/>
function FavouritesScreen({prop}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop}</Text>
        </View>
    );
}

export default FavouritesScreen

//Lokal styling til brug i FavouritesScreen
const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});