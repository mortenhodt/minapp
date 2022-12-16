import React, {} from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

// RentingModal henter dataen fra databasen og id fra RentingPage til å vise frem informasjonen
// om den båtplassen brukeren har valgt
// dockName osv blir hentet fra RentingPage som er funnet med id, og blir nå vist til brukeren
// gjennom denne modal
// ved onPress blir onBook (id) kalt på som vil sette plassen til avaiable (false)
const RentingModal = ({
    id,
    dockName,
    dockNumber,
    boatSize,
    modalVisible,
    setModalVisible,
    onBook,
}) => (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}
    >

    <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>Dock Name: {dockName}</Text>
        <Text style={styles.modalText}>Dock Number: {dockNumber}</Text>
        <Text style={styles.modalText}>Boat Size: {boatSize}</Text>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onBook(id)}
        >
            <Text style={styles.textStyle}>Book</Text>
        </Pressable>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
        >
            <Text style={styles.textStyle}>Close</Text>
        </Pressable>
        </View>
    </View>
    </Modal>
);

// styling
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RentingModal;
// eksporter for å kunne brukes i RentingPage