import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

const ImageTaker = (props) => {
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

    props.onImageTaken(image.uri);
  };

  return (
    <TouchableOpacity style={styles.cameraContainer} onPress={takeImageHandler}>
      <Text style={styles.cameraText}>Ta bilde</Text>
      <Ionicons
        name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
        size={40}
        color="#2f2c41"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  cameraText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2f2c41",
    paddingRight: 10,
  },
});

export default ImageTaker;
