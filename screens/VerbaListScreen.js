import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as verbaActions from "../store/actions/verba";

import VerbaListItem from "../components/VerbaListItem";

const VerbaListScreen = (props) => {
  const dispatch = useDispatch();
  const verba = useSelector((state) => state.verba.verba);
  const [sorted, setSorted] = useState("Alfabetisk");
  const [favorite, setFavorite] = useState("md-heart-half");

  useEffect(() => {
    dispatch(verbaActions.loadVerba("SELECT * FROM verba ORDER BY norwegian"));
  }, [dispatch]);

  props.navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => props.navigation.navigate("AddVerba")}
      >
        <Ionicons name="md-add" size={36} color="#2f2c41" />
      </TouchableOpacity>
    ),
  });

  const showFavoriteVerba = () => {
    switch(favorite) {
      case "md-heart-half":
        setFavorite("md-heart");
        setSorted("Alfabetisk");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba WHERE favorite = 1 ORDER BY norwegian"))
        break;
      case "md-heart":
        setFavorite("md-heart-empty");
        setSorted("Alfabetisk");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba WHERE favorite = 0 ORDER BY norwegian"))
        break;
      case "md-heart-empty":
        setFavorite("md-heart-half");
        setSorted("Alfabetisk");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba ORDER BY norwegian"))
        break;
    }
  }

  const changeSort = () => {
    switch (sorted) {
      case "Alfabetisk":
        setSorted("Ordklasse");
        setFavorite("md-heart-half");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba ORDER BY partOfSpeech, norwegian"));
        verba.sort();
        break;
      case "Ordklasse":
        setSorted("Dato opprettet");
        setFavorite("md-heart-half");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba ORDER BY dateAdded DESC"));
        break;
      case "Dato opprettet":
        setSorted("Alfabetisk");
        setFavorite("md-heart-half");
        dispatch(verbaActions.loadVerba("SELECT * FROM verba ORDER BY norwegian"));
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={() => showFavoriteVerba()}>
            <Ionicons
              name={favorite}
              size={26}
              color="#cfc9ec"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.sortHeaderText}>{sorted}</Text>
        </View>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => changeSort()}
          >
            <Text style={styles.sortIconText}>Sorter</Text>
            <Ionicons name="md-list" size={26} color="#cfc9ec" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={verba}
        extraData={verba}
        renderItem={(item) => (
          <VerbaListItem
            norwegian={item.item.norwegian}
            partOfSpeech={item.item.partOfSpeech}
            date={item.item.dateAdded}
            sorted={sorted}
            favorite={item.item.favorite}
            onItemPressed={() =>
              props.navigation.navigate("VerbaDetail", {
                selectedVerba: item.item
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 40,
  },
  favoriteContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  headerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  sortContainer: {
    flex: 1,
    justifyContent: "center",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  sortHeaderText: {
    color: "#b2a9e0",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  sortIconText: {
    color: "#b2a9e0",
    fontSize: 20,
    marginRight: 5,
    textAlign: "center",
  },
  headerButton: {
    marginRight: 15,
  },
});

export default VerbaListScreen;
