import {StyleSheet, Text, View, Dimensions, Button, ScrollView, Pressable, onPress, TextInput} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, {useState} from "react";
import {RentOutMap} from './RentOutMap'
import { RentingPage } from "./RentingPage";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";


function ExplorePage() {
    //lager en konstant setActiveMap som har som standard "renting"
    const [activeMap, setActiveMap] = useState("RENTING")
//returnerer
    return (
<SafeAreaView>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>

      <View
      //Styling
          style={{
            overflow: "hidden",
            borderRadius: 6,
            flexDirection: "row",
            position: "absolute",
            left: 20,
            marginBottom: 50,
            paddingTop: 10,

          }}
        >
          <Pressable
          // Dersom activeMap er satt til renting vil fargen være hvit, dersom man trykker vil den siden gå til RENTING siden
            style={{
              backgroundColor: activeMap === "RENTING" ? "#333" : "white",
            }}
            onPress={() => setActiveMap("RENTING")}
          >
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                    // styler teksten
                  color: activeMap === "RENTING" ? "white" : "#333",
                  fontWeight: activeMap === "RENTING" ? "bold" : "normal",
                }}
              >
                RENTING
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: activeMap === "RENTING_OUT" ? "#333" : "white",
            }}

            // når man trykker vil siden endres til RENTING_OUT siden
            onPress={() => setActiveMap("RENTING_OUT")}
          >
            <View
            //posisjonering
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,

              }}
            >
              <Text
                style={{
                    //styler teksten ( RENT OUT)
                  color: activeMap === "RENTING_OUT" ? "white" : "#333",
                  fontWeight: activeMap === "RENTING_OUT" ? "bold" : "normal",
                }}
              >
                RENTING OUT
              </Text>
            </View>
          </Pressable>
        </View>

       

        {activeMap === "RENTING" &&
        <RentingPage />
}
        
        
        {activeMap === "RENTING_OUT" &&
        //Dersom activeMap == RENTING_OUT vil koden på RentOutMap kjøre
        <RentOutMap />
        }
      </ScrollView>
      </SafeAreaView>
    );
    }


// eksporterer hele funksjonen explorepage, for å kunne importere den senere
export default ExplorePage

//Lokal styling 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexGrow:1
    },
    contentContainerStyle: {
        backgroundColor: 'white',
        flexGrow: 1,
        paddingVertical: 30
    },
    text: {
        fontSize: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height:"100%"
      },
});

