import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CategorySection = props => {
  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.headerText}>Begynn å øve</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.categoryContaioner}></View>
        <View style={styles.categoryContaioner}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
  },
  headerText: {
    color: "#3f3b56",
    fontSize: 25,
    marginLeft: 20,
    fontWeight: "bold",
  },
  categoryContaioner: {
    backgroundColor: "#d8d4ef",
    borderRadius: 25,
    width: 250,
    height: 150,
    marginHorizontal: 10,
    marginTop: 10
  },
});

export default CategorySection;
