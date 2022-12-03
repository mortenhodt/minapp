import {StyleSheet, Text, View, Dimensions, Button, ScrollView, Pressable, onPress, TextInput} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, {useState} from "react";
import {RentOutMap} from './RentOutMap'
import { RentingPage } from "./RentingPage";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";


<<<<<<< HEAD

=======
// function Explore page
>>>>>>> 1d20190efed1d2742a3d0c05df50ff430f13b41a
function ExplorePage() {
    //lager en konstant setActiveMap som har som standard "renting"
    const [activeMap, setActiveMap] = useState("RENTING")
    const [boatSize, setBoatSize] = useState(30);
    const [mapType, setMapType] = useState("standard");


    const onPress = () => {
        // Check that all the data has been input
        // if(!boatSize) display error
        //....
        // if(!mapPin) display error
        // Save parking lot to the database
        // saveToDB({boatSize, dockName, dockNumber, mapPin})
<<<<<<< HEAD
      };

    return (
<SafeAreaView>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>


      <View
      
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
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,

              }}
            >
              <Text
                style={{
                    //styler teksten
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
=======
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>


                <View

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
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 16,

                            }}
                        >
                            <Text
                                style={{
                                    //styler teksten
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
>>>>>>> 1d20190efed1d2742a3d0c05df50ff430f13b41a



export default ExplorePage

<<<<<<< HEAD
//Lokal styling 
=======
//Lokal styling
>>>>>>> 1d20190efed1d2742a3d0c05df50ff430f13b41a
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
<<<<<<< HEAD
      },
=======
    },
>>>>>>> 1d20190efed1d2742a3d0c05df50ff430f13b41a
});

