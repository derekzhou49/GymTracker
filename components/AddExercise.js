import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default function AddExercise(props) {
    let itemExercise = "";
    let itemSets = "";
    let itemReps = "";
    let itemWeight = "";
    let itemNotes = "";
    
    if (props.route.params !== undefined) {
        itemExercise = props.route.params.exercise.title;
        itemSets = props.route.params.exercise.sets;
        itemReps = props.route.params.exercise.reps;
        itemWeight = props.route.params.exercise.weight;
        itemNotes = props.route.params.exercise.notes;
    }

    const [exercise, setExercise] = useState(itemExercise);
    const [sets, setSets] = useState(itemSets);
    const [reps, setReps] = useState(itemReps);
    const [weight, setWeight] = useState(itemWeight);
    const [notes, setNotes] = useState(itemNotes);

  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style = {{fontSize: 30, textAlign:'center',}}> Add an Exercise </Text>
              <TextInput
              style={styles.headerInput}
              placeholder="Exercise Name"
              defaultValue={exercise}
              onChangeText={text => setExercise(text)} />
          </View>

          <View style={styles.inputContainer}>
              <Text style={styles.inputName}>Sets</Text>
              <TextInput
              style={styles.inputs}
              placeholder= " 1 - 5"
              defaultValue={sets}
              onChangeText={text => setSets(text)} />

              <Text style={styles.inputName}>Reps</Text>
              <TextInput
              style={styles.inputs}
              placeholder=" 8 - 15"
              defaultValue={reps}
              onChangeText={text => setReps(text)} />

              <Text style={styles.inputName}>Weight</Text>
              <TextInput
              style={styles.inputs}
              placeholder="lbs"
              defaultValue={weight}
              onChangeText={text => setWeight(text)} />

              <Text style={styles.inputName}>Notes</Text>
              <TextInput
              style={styles.inputs}
              placeholder= "Sleep, Nutrition, Difficulty "
              defaultValue={notes}
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
