import React from "react";
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddVerbaInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#8f85c3"
        {...props}
        style={styles.input}
      />
      {props.icon ? null: <TouchableOpacity onPress={() => console.log('info pressed')}>
        <Ionicons
          name={
            Platform.OS === "android"
              ? "md-help-circle-outline"
              : "ios-help-circle-outline"
          }
          size={30}
          color="#2f2c41"
        />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginTop: 15,
    backgroundColor: "#cfc9ec",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    width: "90%",
    color: "#2f2c41",
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 15,
  },
});

export default AddVerbaInput;
