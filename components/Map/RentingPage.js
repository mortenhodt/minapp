import {StyleSheet, Text, View, Dimensions, Button, ScrollView, Pressable, TextInput,onPress, Alert} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, {useState, useEffect} from "react";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';
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

  if (filterValue) {
    result = result.filter(spot => spot.boatSize <= filterValue);
  }

  return [result, setParkingSpots, setFilterValue];
}

const getSelectedParkingSpot = (id, parkingSpots) => {
  return parkingSpots.find(spot => spot.id == id);
}

export const RentingPage = () => {
    //lager en konstant setActiveMap som har som standard "renting"
    const [boatSize, setBoatSize] = useState(30);
    const [mapType, setMapType] = useState("standard");
    const [parkingSpots, setParkingSpots, setFilterValue] = useParkingSpots([]);
    const [selectedMarker, setSelectedMarker] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedParkingSpot = getSelectedParkingSpot(selectedMarker, parkingSpots);

    const onMarkerSelectGenerator = (id) => {
      return () => {
        setSelectedMarker(id);
        setModalVisible(true);
      };
    };

    const onBook = (id) => {
      const data = {
        ...selectedParkingSpot,
        available: false,
      };
      delete data["id"]; 

      setModalVisible(false);
      
      try {
        firebase
          .database()
          .ref(`/parkingSpots/${id}`)
          .update(data);
        
        Alert.alert(`Booking confirmed! (${id})`);
      } catch (error) {
        console.log(error);
        Alert.alert("Something went wrong!");
      }
    };

    useEffect(() => {
      async function fetchData() {
        let listener;
        let ref;

        try {
          ref = firebase
            .database()
            .ref('/parkingSpots/');

          listener = ref.on('value', (snapshot) => {
              const data = snapshot.val();
              setParkingSpots(Object.keys(data).map((id) => {
                data[id].id = id;
                return data[id];
              }));
            });
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