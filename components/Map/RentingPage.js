import {StyleSheet, Text, View, Dimensions, Button, ScrollView, Pressable, TextInput,onPress} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, {useState} from "react";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';



export const RentingPage = () => {
    //lager en konstant setActiveMap som har som standard "renting"
    const [boatSize, setBoatSize] = useState(30);
    const [time, setTime] = useState(1);
    const [mapType, setMapType] = useState("standard");


    return (
        <View>

            <View style={{ paddingHorizontal: 30 }}>
                <Text style={{ fontSize: 20, marginBottom: 40, paddingTop:40 }}>
                    Find a boat parking spot
                </Text>
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

                <View>

                </View>

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
                <Pressable
                    onPress={onPress}
                    title="Search"
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
                        Search
                    </Text>
                </Pressable>
            </View>



        </View>
    );
};