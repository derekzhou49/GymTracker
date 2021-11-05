import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function AddExercise(props) {
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style = {{fontSize: 30, textAlign:'center',}}> Add an Exercise </Text>
              <TextInput
              style={styles.headerInput}
              placeholder="Exercise Name"
              onChangeText={text => setExercise(text)} />
          </View>

          <View style={styles.inputContainer}>
              <Text style={styles.inputName}>Sets</Text>
              <TextInput
              style={styles.inputs}
              placeholder= " 1 - 5"
              onChangeText={text => setSets(text)} />

              <Text style={styles.inputName}>Reps</Text>
              <TextInput
              style={styles.inputs}
              placeholder=" 8 - 15"
              onChangeText={text => setReps(text)} />

              <Text style={styles.inputName}>Weight</Text>
              <TextInput
              style={styles.inputs}
              placeholder="lbs"
              onChangeText={text => setWeight(text)} />

              <Text style={styles.inputName}>Notes</Text>
              <TextInput
              style={styles.inputs}
              placeholder= "Sleep, Nutrition, Difficulty "
            //   multiline={true}
              onChangeText={text => setNotes(text)} />
          </View>

        <TouchableOpacity
        onPress={() => {
            const data = {id: Math.random().toString(),
                title: exercise,
                sets: sets,
                reps: reps,
                weight: weight,
                notes: notes
            }
            props.navigation.navigate("StartWorkout", {data})
        }} > 
            <View style = {styles.submit}>
                <Text style = {{fontSize: 25, textAlign: 'center', }}> Submit </Text>
            </View>
        </TouchableOpacity>  
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        textAlign: "center",
        paddingVertical: 60
    },
    headerInput: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 20,
    },
    inputContainer: {

    },
    inputName: {
        textAlign: "center",
        fontSize: 20,
    },
    inputs: {
        textAlign: "center",
        paddingVertical: 30,
        paddingTop: 10,
        fontSize: 20,
    },
    notes: {

    },
    submit: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'pink',
        borderColor: 'black',
        borderRadius: 25,
    }
});
