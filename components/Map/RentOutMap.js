import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";
import firebase from "firebase/compat";
import {AppContext} from "../AppContext";


// lager en async function, der "if" all input har blitt lagt inn fra bruker vil funksjonen fortsette ved try
const submitParkingSpot = async (parkingSpot) => {
  if (
    !parkingSpot.dockName 
    || !parkingSpot.dockNumber 
    || !parkingSpot.available 
    || !parkingSpot.ownerID 
    || !parkingSpot.boatSize 
    || !parkingSpot.coordinate 
    || !parkingSpot.coordinate.latitude
    || !parkingSpot.coordinate.longitude
  ) {
    // dersom en bruker ikke har fyllt ut alle felt kommer denne meldingen opp
    Alert.alert("Error, incorrect information!");
    return;
  }
// her kaller man på firebase og finner listen parkingSpots, og pusher den nye instansen fra brukerens input
  try {
    await firebase
      .database()
      .ref('/parkingSpots/')
      .push(parkingSpot);
      // ved suksess vises denne meldingen
    Alert.alert("Parking spot saved!");
  } catch (error) {
    //dersom noe går galt vil brukeren få opp denne meldingen
    console.log(error);
    Alert.alert("Something went wrong. Try again!");
  }
};

// lager og eksporterer konstanten RentOutMap for å kunne lagre informasjonen som blir lagt inn av bruker
export const RentOutMap = () => {
  const [globalUser, setGlobalUser] = useContext(AppContext)
  const [boatSize, setBoatSize] = useState(30);
  const [dockName, setDockName] = useState("");
  const [dockNumber, setDocNumber] = useState("");
  const [mapPin, setMapPin] = useState();
  const [mapType, setMapType] = useState("standard");
  // const [parkingLots, setParkingLots] = useState([...])

  // cleanup funksjonen setter alle consts tilbake, det gir brukeren ett tydelig tegn på at de har lagret
  const cleanup = () => {
    setBoatSize(30);
    setDockName("");
    setDocNumber("");
    setMapPin();
    setMapType("standard");
  };


  const onPress = async () => {
    await submitParkingSpot({
      boatSize,
      dockName,
      dockNumber,
      ownerID: globalUser.id,
      available: true,
      coordinate: mapPin,
    });
    cleanup();
  };


  return (
    // lager en overskrift for RENTING_OUT og båt størrelsen
    // styling
    // henter int fra boatsize og viser til bruker
    <View style={{ paddingHorizontal: 30 }}>
      <Text style={{ fontSize: 20, marginBottom: 40, paddingTop: 40 }}>
        Add a boat parking spot
      </Text>
      <View style={{ marginBottom: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 8 }}>Boat size in foot:</Text>
          <Text>{`${boatSize}`}</Text>
        </View>
        
        <Slider
        //Bruker en slider for at burker skal velge størrelse og setter den fra 10 til 50, med step 1, altså den økes kun med hele tall
        //value boatsize blir deretter lagret, setboatsize
          style={{ width: "auto", height: 40 }}
          minimumValue={10}
          maximumValue={50}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#ddd"
          value={boatSize}
          onValueChange={setBoatSize}
          step={1}
        />
      </View>
   
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}
      >
        
        <Text>Dock name: </Text>

        <TextInput
        // Textinput for at bruker skal kunne skrive inn navnet på bryggen(stedsnavn), input blir lagret ved setDockName
          value={dockName}
          onChangeText={setDockName}
          style={style.textInput}
          autoCorrect={false}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Dock number: </Text>
        <TextInput
        // Textinput for dock nummer så en bruker lett skal finne fram til riktig båtplass
        // setter keyboardtype til number pad slik at det vil være lett å skrive inn kun int
          value={dockNumber}
          onChangeText={setDocNumber}
          style={style.textInput}
          autoCorrect={false}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <MapView
        //Mapview henter inn et kart, vi har valgt fra Google, setter initial region til koordinatene til Oslo ettersom det er der
        //vi skal starte utrullingen av appen
          initialRegion={{
            latitude: 59.911491,
            longitude: 10.757933,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          mapType={mapType}
          style={{ height: 300, marginVertical: 30 }}
          // når en bruker trykker lenge på skjermen vil det settes en marker/pin
          onLongPress={(e) => setMapPin(e.nativeEvent.coordinate)}
        >
          {!!mapPin && <Marker coordinate={mapPin} />}
        </MapView>
        <View
          style={{
            overflow: "hidden",
            borderRadius: 6,
            flexDirection: "row",
            position: "absolute",
            top: 40,
            right: 10,
          }}
        >
          <Pressable
          // For at en bruker skal kunne velge mellom standard og satalitt kart lager vi en toggle
            style={{
                // dersom maptype er standard vil bakgrunnen være hvit
              backgroundColor: mapType === "standard" ? "#333" : "white",
            }}
            // når en bruker trykker vil kartet settes til standard kart
            onPress={() => setMapType("standard")}
          >
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  color: mapType === "standard" ? "white" : "#333",
                  fontWeight: mapType === "standard" ? "bold" : "normal",
                }}
              >
                Default
              </Text>
            </View>
          </Pressable>
          <Pressable
          // lager en ny pressable for satalitt og setter den til hvit
            style={{
              backgroundColor: mapType === "satellite" ? "#333" : "white",
            }}
            // Når en bruker trykker vil kartet endres til satellite
            onPress={() => setMapType("satellite")}
          >
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  color: mapType === "satellite" ? "white" : "#333",
                  fontWeight: mapType === "satellite" ? "bold" : "normal",
                }}
              >
                Satellite
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
      // lager en pressable for save spot
        onPress={onPress}
        title="Save spot"
        style={{
          backgroundColor: "#333",
          borderRadius: 6,
          marginVertical: 30,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "uppercase",
          }}
        >
          Save spot
        </Text>
      </Pressable>
    </View>
  );
};
//styling
const style = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
});
