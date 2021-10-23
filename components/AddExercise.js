import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function AddExercise() {
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <TextInput
              style={styles.headerInput}
              placeholder="Exercise Name"
              onChangeText={text => setExercise(text)} />
          </View>

          <View style={styles.inputContainer}>
              <Text style={styles.inputName}>Sets</Text>
              <TextInput
              style={styles.inputs}
              placeholder="Number of Sets"
              onChangeText={text => setSets(text)} />

              <Text style={styles.inputName}>Reps</Text>
              <TextInput
              style={styles.inputs}
              placeholder="Number of Reps"
              onChangeText={text => setReps(text)} />

              <Text style={styles.inputName}>Weight</Text>
              <TextInput
              style={styles.inputs}
              placeholder="Weight (lbs)"
              onChangeText={text => setWeight(text)} />

              <Text style={styles.inputName}>Notes</Text>
              <TextInput
              style={styles.inputs}
              placeholder="Notes"
            //   multiline={true}
              onChangeText={text => setNotes(text)} />
          </View>

          <View>
              <Button
              title="Submit" />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey"
    },
    header: {
        textAlign: "center",
        paddingVertical: 60
    },
    headerInput: {
        textAlign: "center",
        fontSize: 30
    },
    inputContainer: {

    },
    inputName: {
        textAlign: "center"
    },
    inputs: {
        textAlign: "center",
        paddingVertical: 30,
        paddingTop: 10
    },
    notes: {

    },
    submit: {
        paddingTop: 20
    }
});
