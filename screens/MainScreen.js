import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as verbaActions from "../store/actions/verba";
import CategorySection from "../components/CategorySection";

import { DYR, VERB } from "../data/dummy-verba";

const MainScreen = (props) => {
  const verba = useSelector((state) => state.verba.verba);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verbaActions.loadVerba("SELECT * FROM verba"));
  }, []);

  const goToPractice = () => {
    const randomizedVerba = shuffle(verba);
    if (verba.length > 0) {
    // if (true) {
      props.navigation.navigate("Practice", { verba: randomizedVerba });
    } else {
      Alert.alert(
        "Ingen ord lagret!",
        "Det må opprettes ord under Dine Verba for å kunne starte øvingen",
        [{ text: "Ok" }]
      );
    }
  };

  const shuffle = (array) => {
    var m = array.length,
      t,
      i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          Platform.OS === "android" ? { marginTop: 30 } : null,
        ]}
      >
        <Text style={styles.headerText}>Verba</Text>
        <Ionicons size={50} name="md-book" color="#3f3b56" />
      </View>
      {/* <CategorySection /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => goToPractice()}
        >
          <Text style={styles.menuBtnText}>Start Øvelse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            props.navigation.navigate("VerbaList", { verba: verba })
          }
        >
          <Text style={styles.menuBtnText}>Dine Verba</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  headerContainer: {
    width: "100%",
    // height: "30%",
    alignItems: "center",
    justifyContent: "flex-end",
    // marginTop: 40
  },
  buttonContainer: {
    marginBottom: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    backgroundColor: "#d8d4ef",
    width: "70%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 15,
  },
  menuBtnText: {
    color: "#3f3b56",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#3f3b56",
  },
});

export default MainScreen;
