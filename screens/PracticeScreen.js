import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const PracticeScreen = (props) => {
  const { verba } = props.route.params;
  const [wordNumber, setWordNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [correctGuess, setCorrectGuess] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [falseAnswer, setFalseAnswer] = useState(false);
  const [hint, setHint] = useState(verba[wordNumber].description > 0);

  const checkAnswer = () => {
    if (
      guess.trim().toUpperCase() === verba[wordNumber].norwegian.toUpperCase()
    ) {
      setCorrectGuess(correctGuess + 1);
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
      setFalseAnswer(true);
    }
  };

  const giveHint = () => {
    if (!hint && verba[wordNumber].description !== "" && false) { // Remove false for hint activation
      setHint(!hint);
    } else {
      setGuess(verba[wordNumber].norwegian);
      setFalseAnswer(false);
      setCorrectAnswer(true);
    }
  };

  const HintContainer = (
    <View style={styles.wordContainer}>
      <Text>{verba[wordNumber].description}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Oversett dette ordet</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.taskText, { color: "#b2a9e0" }]}>
            {correctGuess}/
          </Text>
          <Text style={[styles.taskText, { color: "#b2a9e0" }]}>
            {verba.length}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.wordText}>{verba[wordNumber].english}</Text>
      </View>
      <View style={styles.subContainer}>
        <TextInput
          textAlign="center"
          placeholder="Skriv her"
          multiline={true}
          spellCheck={false}
          autoCorrect={false}
          autoCompleteType="off"
          style={[
            styles.textInput,
            correctAnswer ? styles.textInputValid : null,
            falseAnswer ? styles.textInputInvalid : null,
          ]}
          onChangeText={(text) => {
            if (!correctAnswer) {
              // setCorrectAnswer(false);
              setFalseAnswer(false);
              setGuess(text);
            }
          }}
          value={guess}
        />
      </View>
      {hint ? HintContainer : null}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.tipsButton} onPress={() => giveHint()}>
          <View style={styles.iconContainer}>
            <Ionicons
              size={36}
              name="md-information-circle-outline"
              color="#ecf9f2"
            />
          {/* <Text style={styles.buttonText}>
            {hint ? "Hint" : "Fasit"}
          </Text> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => {
            if (!correctAnswer) {
              checkAnswer();
            } else {
              if (wordNumber !== verba.length - 1) {
                setWordNumber(wordNumber + 1);
                setCorrectAnswer(false);
                setFalseAnswer(false);
                setCorrectGuess(correctGuess + 1);
                setGuess("");
                setHint(verba[wordNumber].description > 0);
              } else {
                Alert.alert(
                  "Ferdig!",
                  "Du klarte " + correctGuess + " av " + verba.length + " ord.",
                  [
                    {
                      text: "Ok",
                      onPress: () => {
                        props.navigation.goBack();
                      },
                    },
                  ]
                );
              }
            }
          }}
        >
          <Text style={styles.buttonText}>
            {correctAnswer ? "Neste" : "Vis svar"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 20,
    fontWeight: "500",
  },
  wordText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  textInput: {
    backgroundColor: "#e2def3",
    width: "95%",
    height: 100,
    borderRadius: 20,
    borderColor: "#7f76ad",
    borderWidth: 1,
    fontSize: 26,
  },
  textInputValid: {
    backgroundColor: "#9CE37D",
    borderColor: "#5d884b",
  },
  textInputInvalid: {
    backgroundColor: "#f8a8aa",
    borderColor: "#903033",
  },
  checkButton: {
    backgroundColor: "#45CB85",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 50,
    borderRadius: 20,
  },
  tipsButton: {
    backgroundColor: "#F68E5F",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 50,
    borderRadius: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ecf9f2",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default PracticeScreen;
