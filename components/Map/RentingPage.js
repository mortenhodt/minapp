import {StyleSheet, Text, View,Pressable, Alert} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, {useState, useEffect} from "react";
import Slider from "@react-native-community/slider";
import firebase from "firebase/compat";
import RentingModal from "./RentingModal";

/*
Parking spot data structure:
{
  dockName: 'Test Name',
  dockNumber: 123,
  ownerID: 'asdf',
  available: false,
  boatSize: 20,
  coordinate: {
    latitude: 59.911491,
    longitude: 10.757933,
  },
}
*/

const useParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [filterValue, setFilterValue] = useState();
  let result = parkingSpots.filter(spot => spot.available);

  // sjekkker om den valgt strl fra bruker er lik eller mindre enn den satte strl på utleier
  if (filterValue) {
    result = result.filter(spot => spot.boatSize >= filterValue);
  }
  // returnerer kun de plassene som passer til filteret

  return [result, setParkingSpots, setFilterValue];
}

const getSelectedParkingSpot = (id, parkingSpots) => {
  return parkingSpots.find(spot => spot.id == id);
}

export const RentingPage = () => {
    const [boatSize, setBoatSize] = useState(30);
    const [mapType, setMapType] = useState("standard");
    const [parkingSpots, setParkingSpots, setFilterValue] = useParkingSpots([]);
    const [selectedMarker, setSelectedMarker] = useState();
    const [modalVisible, setModalVisible] = useState(false);
// selectedParkingSpot tar inn selectedMarked og parkingspots, dette gjør det mulig å hente ut data
// som id for å bruke til å hente ut annen data fra databasen
    const selectedParkingSpot = getSelectedParkingSpot(selectedMarker, parkingSpots);

    // etter å ha funnet id til marker kaller vi på setSelectedMarker med input "id" og setModalVisible til true
    // det vil da vise modal popopen
    const onMarkerSelectGenerator = (id) => {
      return () => {
        setSelectedMarker(id);
        setModalVisible(true);
      };
    };
// onBook tar inn id, og ... henter alle boatSize osv, deretter settes den til available: false
//slik at den ikke lenger vil være synlig på kartet, til slutt settes setModalVisible til false slik at den lukkes.
    const onBook = (id) => {
      const data = {
        ...selectedParkingSpot,
        available: false,
      };
      delete data["id"]; 

      setModalVisible(false);
      // oppdaterer båtplassen(id) med den nye dataen
      try {
        firebase
          .database()
          .ref(`/parkingSpots/${id}`)
          .update(data);
        // alert til bruker om at booking er confirmed
        Alert.alert(`Booking confirmed!`);
      } catch (error) {
        //dersom det skjer en feil vil det komme en alert til brukeren
        console.log(error);
        Alert.alert("Something went wrong!");
      }
    };


    useEffect(() => {
      async function fetchData() {
        let listener;
        let ref;
// henter listen med parkingSpots fra databasen
        try {
          ref = firebase
            .database()
            .ref('/parkingSpots/');
// listener returnerer en referanse til listeneren
//bruker en snapshot av listen til å finne id´en til instansen av parkingSpots
//går deretter gjennom listen til den finner instansen med riktig "id"
// sjekker om data[id].id = id for å sikre at det er riktig
//returnerer data[id]
          listener = ref.on('value', (snapshot) => {
              const data = snapshot.val();
              setParkingSpots(Object.keys(data).map((id) => {
                data[id].id = id;
                return data[id];
              }));
            });
            // ved en feil vil brukeren få en alert
        } catch (error) {
          console.log(error);
          Alert.alert("Something went wrong!");
        }
        return () => {
          listener && ref && ref.off('value', listener);
        };
      };
      fetchData();
    }, [setParkingSpots]);


    return (
      // Styling og overskrifter
      //mapView er forklart i RentOutMap
    <View>
    <View style={{ paddingHorizontal: 30 }}>
    <Text style={{ fontSize: 20, marginBottom: 40, paddingTop:40 }}>
     Find a boat parking spot
    </Text>


    <Text style={{ fontSize: 15, marginBottom: 10, paddingTop:10 }}>
     Time picker will be put in here
    </Text>

    <View>
            <MapView
              initialRegion={{
                latitude: 59.911491,
                longitude: 10.757933,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}
              mapType={mapType}
              style={{ height: 400, marginVertical: 30 }}
            >
              {
                parkingSpots.map(
                  (spot) => (
                    <Marker 
                      onPress={onMarkerSelectGenerator(spot.id)} 
                      key={spot.id}
                      coordinate={spot.coordinate}
                    />
                  )
                )
              }
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
                style={{
                  backgroundColor: mapType === "standard" ? "#333" : "white",
                }}
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
                style={{
                  backgroundColor: mapType === "satellite" ? "#333" : "white",
                }}
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
          <View style={{ marginBottom: 30 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 8 }}>Boat size in foot:</Text>
            <Text>{`${boatSize}`}</Text>
          </View>

          <Slider
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
          <Pressable
            onPress={() => setFilterValue(boatSize)}
            title="Search"
            style={{
              backgroundColor: "#333",
              borderRadius: 6,
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
              Search
            </Text>
          </Pressable>
      </View>
      
      {
        selectedParkingSpot && (
          <RentingModal
            id={selectedParkingSpot.id}
            dockName={selectedParkingSpot.dockName}
            dockNumber={selectedParkingSpot.dockNumber}
            boatSize={selectedParkingSpot.boatSize}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onBook={onBook}
          />
        )
      }
                
    </View>
    );
};
// selectedparkingspot er som tidligere nevnt den markøren brukeren har trykket på, den informasjonen
// blir henvist til rentingModal og den aktualle dataen satt, deretter blir setModalVisable og onBook kalt på 