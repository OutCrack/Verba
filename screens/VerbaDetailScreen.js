import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as verbaActions from "../store/actions/verba";
// import NetInfo from "@react-native-community/netinfo";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const VerbaDetailScreen = (props) => {
  const { selectedVerba } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditmode] = useState(false);
  const [norwegian, setNorwegian] = useState(selectedVerba.norwegian);
  const [english, setEnglish] = useState(selectedVerba.english);
  const [category, setCategory] = useState(selectedVerba.category);
  const [partOfSpeech, setPartOfSpeech] = useState(selectedVerba.partOfSpeech);
  const [description, setDescription] = useState(selectedVerba.description);
  const [imageUri, setImageUri] = useState(selectedVerba.imageUri);
  const [favorite, setFavorite] = useState(selectedVerba.favorite);
  const dispatch = useDispatch();

  // const unsubscribe = NetInfo.addEventListener(state => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected", state.isConnected);
  // });

  const deleteHandler = () => {
    Alert.alert(
      "",
      "Ønsker du å slette dette ordet?",
      [
        { text: "Nei", style: "cancel" },
        {
          text: "Slett",
          onPress: () => {
            dispatch(verbaActions.deleteVerba(selectedVerba.id));
            // -------------------------------------------- IKKE BRA MÅTE Å LØSE DET PÅ -----------------------------------------------
            props.navigation.navigate("Main");
            props.navigation.navigate("VerbaList");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const editSaveHandler = () => {
    if (!editMode) {
      setEditmode(true);
    } else {
      // Update Database with new data
      if (norwegian && english) {
        dispatch(
          verbaActions.editVerba(
            selectedVerba.id,
            norwegian,
            english,
            category,
            partOfSpeech,
            description,
            imageUri,
            favorite,
            selectedVerba.dateAdded
          )
        );
        setEditmode(false);
      } else {
        Alert.alert(
          "Ikke riktig fylt inn!",
          "Venligst fyll inn feltet for nork og engelsk for å forsette.",
          [{ text: "Ok" }]
        );
      }
    }
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okey" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageUri(image.uri);
  };

  props.navigation.setOptions({
    headerRight: () => (
      <View style={styles.headerButtons}>
        {editMode ? null : (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => deleteHandler()}
          >
            <Ionicons name="md-trash" size={36} color="#2f2c41" />
          </TouchableOpacity>
        )}
        {!editMode ? (
          <TouchableOpacity onPress={() => editSaveHandler()}>
            <Ionicons name="md-create" size={36} color="#2f2c41" />
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                setEditmode(!editMode);
              }}
            >
              <Ionicons name="md-close" size={36} color="#2f2c41" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editSaveHandler()}>
              <Ionicons name="md-checkmark" size={36} color="#2f2c41" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    ),
  });

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Skriv in ny URL her</Text>
            <TextInput
              onChangeText={(text) => setImageUri(text)}
              style={styles.editField}
            />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="md-checkmark" size={20} color="#2f2c41" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {!editMode ? (
        !imageUri ? (
          <View style={styles.noImage}>
            <View style={styles.favoriteIcon}>
              <Ionicons
                name={favorite ? "md-heart" : "md-heart-empty"}
                size={36}
                color="#2f2c41"
              />
            </View>
            <Text>Ingen bilde tilgjengelig</Text>
          </View>
        ) : (
          <View style={styles.noImage}>
            <Image style={styles.image} source={{ uri: imageUri }} />
            <View style={styles.favoriteIcon}>
              <Ionicons
                name={favorite ? "md-heart" : "md-heart-empty"}
                size={36}
                color="#2f2c41"
              />
            </View>
          </View>
        )
      ) : (
        <View style={styles.noImage}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="md-link" size={36} color="#2f2c41" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={takeImageHandler}
          >
            <Ionicons name="md-camera" size={36} color="#2f2c41" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.favoriteIcon,
              { backgroundColor: "", borderRadius: 0 },
            ]}
            onPress={() => setFavorite(!favorite)}
          >
            <Ionicons
              name={favorite ? "md-heart" : "md-heart-empty"}
              size={36}
              color="#2f2c41"
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.rowContainer}>
        {editMode ? (
          <TextInput
            style={styles.editField}
            onChangeText={(text) => setNorwegian(text)}
            value={norwegian}
          />
        ) : (
          <Text style={styles.headerText}>{norwegian}</Text>
        )}
        <Text style={styles.lightText}>Norsk</Text>
      </View>
      <View style={styles.rowContainer}>
        {editMode ? (
          <TextInput
            style={styles.editField}
            onChangeText={(text) => setEnglish(text)}
            value={english}
          />
        ) : (
          <Text style={styles.headerText}>{english}</Text>
        )}
        <Text style={styles.lightText}>Engelsk</Text>
      </View>
      <View style={styles.rowContainer}>
        {editMode ? (
          <TextInput
            style={styles.editField}
            onChangeText={(text) => setPartOfSpeech(text)}
            value={partOfSpeech}
          />
        ) : (
          <Text style={styles.headerText}>{partOfSpeech}</Text>
        )}
        <Text style={styles.lightText}>Ordklasse</Text>
      </View>
      <View style={styles.rowContainer}>
        {editMode ? (
          <TextInput
            style={styles.editField}
            onChangeText={(text) => setCategory(text)}
            value={category}
          />
        ) : (
          <Text style={styles.headerText}>{category}</Text>
        )}
        <Text style={styles.lightText}>Kategori</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.headerText}>{selectedVerba.dateAdded}</Text>
        <Text style={styles.lightText}>Opprettet</Text>
      </View>
      <View style={styles.descriptionContainer}>
        {editMode ? (
          <TextInput
            style={styles.editField}
            onChangeText={(text) => setDescription(text)}
            value={description}
            multiline={true}
            placeholder="Beskrivelse"
            placeholderTextColor="#bbb4e4"
          />
        ) : (
          <Text style={styles.descriptionText}>{description}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomColor: "#9f94d9",
    borderBottomWidth: 0.5,
  },
  descriptionContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#2f2c41",
  },
  image: {
    width: "100%",
    height: 200,
  },
  imageButton: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionText: {
    fontSize: 20,
    paddingLeft: 15,
    color: "#2f2c41",
  },
  lightText: {
    fontSize: 20,
    paddingLeft: 15,
    color: "#bbb4e4",
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    marginRight: 10,
  },
  headerButton: {
    marginRight: 25,
  },
  noImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4f4a6c",
    borderWidth: 1,
    flexDirection: "row",
  },
  editField: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f2c41",
    backgroundColor: "#d8d4ef",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  favoriteIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f4fb",
    position: "absolute",
    top: 5,
    right: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default VerbaDetailScreen;
