import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const verbaListItem = (props) => {
  const date = props.date.split("-");
  const reformateDate = date[2] + "-" + date[1] + "-" + date[0];
  return (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.item}>
      <Text style={styles.title}>{props.norwegian}</Text>
      <View style={styles.container}>
        {props.sorted === "Dato opprettet" ? (
          <Text style={styles.type}>{reformateDate}</Text>
        ) : (
          <Text style={styles.type}>{props.partOfSpeech}</Text>
        )}
        <Ionicons
          name={props.favorite === 1 ? "md-heart" : "md-heart-empty"}
          size={26}
          color="#cfc9ec"
        />
      </View>
    </View>
  </TouchableOpacity>
)};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f4fb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#9f94d9",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    color: "#2f2c41",
  },
  type: {
    fontSize: 16,
    color: "#b2a9e0",
    marginRight: 20,
  },
});

export default verbaListItem;
