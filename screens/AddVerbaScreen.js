import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as verbaActions from "../store/actions/verba";
import { Picker } from "@react-native-community/picker";

import AddVerbaInput from "../components/AddVerbaInput";
import ImageTaker from "../components/ImageTaker";


const AddVerbaScreen = (props) => {
  const [norwegian, setNorwegian] = useState("");
  const [english, setEnglish] = useState();
  const [category, setCategory] = useState();
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [description, setDescription] = useState();
  const [imageUri, setImageUri] = useState();
  const [favorite, setFavorite] = useState(true);

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (!norwegian || !english) {
      Alert.alert(
        "Ikke riktig fylt inn!",
        "Venligst fyll inn feltet for nork og engelsk for å forsette.",
        [{ text: "Ok" }]
      );
    } else {
      const date = new Date();
      const dateToday = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      dispatch(
        verbaActions.createVerba(
          norwegian.trim(),
          english.trim(),
          category,
          partOfSpeech,
          description,
          imageUri,
          favorite,
          dateToday
        )
      );
      // -------------------------------------------- IKKE BRA MÅTE Å LØSE DET PÅ -----------------------------------------------
      // props.navigation.navigate("Main");
      props.navigation.navigate("VerbaList"); // THIS ONLY DOES NOT LOAD THE FAVORITE MARK IN THE LIST
      // props.navigation.pop(1);
    }
  };

  const imageTakenHandler = imagePath => {
    setImageUri(imagePath);
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>New word</Text>
        <TouchableOpacity
          onPress={() => {
            favorite ? setFavorite(false) : setFavorite(true);
          }}
        >
          <Ionicons
            name={favorite ? "md-heart" : "md-heart-empty"}
            size={36}
            color="#2f2c41"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <AddVerbaInput
          placeholder="Norsk"
          onChangeText={(text) => setNorwegian(text)}
          icon={true}
        />
        <AddVerbaInput
          placeholder="Englesk"
          onChangeText={(text) => setEnglish(text)}
          icon={true}
        />
        {Platform.OS === "android" ? (
          <View style={styles.pickerContainer}>
            <Picker
              style={
                partOfSpeech === ""
                  ? styles.picker
                  : [styles.picker, { color: "#2f2c41" }]
              }
              selectedValue={partOfSpeech}
              onValueChange={(val) => setPartOfSpeech(val)}
              mode={"dropdown"}
            >
              <Picker.Item label="Ordklasse" value="" />
              <Picker.Item label="Substantiv" value="Substantiv" />
              <Picker.Item label="Verb" value="Verb" />
              <Picker.Item label="Adjektiv" value="Adjektiv" />
              <Picker.Item label="Adverb" value="Adverb" />
              <Picker.Item label="Pronomen" value="Pronomen" />
            </Picker>
          </View>
        ) : (
          <AddVerbaInput
            placeholder="Ordklasse"
            onChangeText={(text) => setPartOfSpeech(text)}
          />
        )}

        <AddVerbaInput
          placeholder="Kategori"
          onChangeText={(text) => setCategory(text)}
        />
        <AddVerbaInput
          placeholder="Beskrivelse"
          onChangeText={(text) => setDescription(text)}
        />
        <AddVerbaInput
          placeholder="Bilde URL"
          onChangeText={(text) => setImageUri(text)}
          value={imageUri}
        />
        <ImageTaker onImageTaken={imageTakenHandler} />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => submitHandler()}
      >
        <Text style={styles.saveButtonText}>Lagre nytt ord</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f4fb",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f2c41",
  },
  inputContainer: {
    alignSelf: "center",
    width: "90%",
  },
  saveButton: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#4f4a6c",
    padding: 12,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    textAlign: "center",
    color: "#f5f4fb",
    fontWeight: "bold",
    fontSize: 20,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    marginTop: 15,
    backgroundColor: "#cfc9ec",
    borderRadius: 10,
    paddingLeft: 22,
    paddingRight: 4,
  },
  picker: {
    color: "#8f85c3",
    width: "100%",
    fontSize: 16,
  },
});

export default AddVerbaScreen;
