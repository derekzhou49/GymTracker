import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import SliderText from 'react-native-slider-text';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LogWorkout(props) {

    let itemExercise = "";
    let itemSets = "";
    let itemReps = "";
    let itemWeight = "";
    let itemNotes = "";

    const [notes, setNotes] = useState("");

    let exerciseName = props.route.params.exercise.name;
    
    if (props.route.params !== undefined) {
        itemExercise = props.route.params.exercise.name;
        itemSets = props.route.params.exercise.sets;
        itemReps = props.route.params.exercise.reps;
        itemWeight = props.route.params.exercise.weight;
    }

    const [exercise, setExercise] = useState(itemExercise);
    const [setsValue, setSetsValue] = useState(itemSets);
    const [repsValue, setRepsValue] = useState(itemReps);
    const [weightValue, setWeightValue] = useState(itemWeight);

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {"Log " + exerciseName } </Text>
          </View>
          <View style={styles.inputContainer}>
              <View>
                  <View>
						  <Text style={{fontSize: 25, paddingRight: 20, textAlign: "center"}}>Notes</Text>
						  <TextInput
							placeholder = "Sleep, Calories, Difficulty, ... etc" 
							multiline = {true}
							style = {styles.notesInput}
							onSubmitEditing={Keyboard.dismiss}
							onChangeText={notes => setNotes(notes)}
							/>
                  </View>
              </View>
            <View style = {{height: 100}}>
              <View style = {styles.slider}>
                <SliderText
                    minimumTrackTintColor="#000"
                    thumbTintColor="#000"
                    maximumTrackTintColor="#2162C2"
                    maximumValue={10}
                    stepValue={1}
                    minimumValueLabel="0"
                    maximumValueLabel="10"
                    onValueChange={(id) => setSetsValue(id)}
                    sliderValue={setsValue}
                    value={setsValue}/>
                </View>
              </View>

              <View style = {{height: 130}}>
                <Text style={styles.inputName}>Sets</Text>
              <View style = {styles.slider }>
                <SliderText
                    minimumTrackTintColor="#000"
                    thumbTintColor="#000"
                    maximumTrackTintColor="#2162C2"
                    maximumValue={25}
                    stepValue={1}
                    minimumValueLabel="0"
                    maximumValueLabel="25"
                    onValueChange={(id) => setRepsValue(id)}
                    sliderValue={repsValue}
                    value={repsValue}/>
              </View>
              </View>

              <Text style={styles.inputName}>Reps</Text>

            <View style = {{height: 120,}}>
              <View style = {styles.slider}>
                <SliderText
                    minimumTrackTintColor="#000"
                    thumbTintColor="#000"
                    maximumTrackTintColor="#2162C2"
                    maximumValue={600}
                    stepValue={2.5}
                    minimumValueLabel="0"
                    maximumValueLabel="600"
                    onValueChange={(id) => setWeightValue(id)}
                    sliderValue={weightValue}
                    value={weightValue}
                    />
                </View>
              </View>
                <Text style={styles.inputName}>Weight</Text>

          </View>

        <TouchableOpacity
        onPress={() => {
            const data = {id: Math.random().toString(),
                name: exercise,
                sets: setsValue,
                reps: repsValue,
                weight: weightValue,
                exerciseId: props.route.params.exercise.exerciseId,
                notes: notes,
                date: props.route.params.exercise.date,
                index: props.route.params.exercise.index,
                completed: props.route.params.exercise.completed
            }
            props.navigation.navigate("WorkoutChecklist", {workout: props.route.params.exercises, workoutLog: data, workoutName: props.route.params.workoutName})
        }} > 
            <View style = {styles.submit}>
                <Text style = {{fontSize: 15, textAlign: 'center', color: 'white' }}> Submit </Text>
            </View>
        </TouchableOpacity>  
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: windowWidth,
    },
    header: {
        textAlign: "center",
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerInput: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 30,
        // borderBottomWidth: 2,
        // borderBottomColor: 'black',
    },
    inputContainer: {
        alignItems: 'center',
    },
    inputName: {
        textAlign: "center",
        fontSize: 30,
        // borderColor: 'black',
        // borderWidth: 2,
    },
    inputs: {
        textAlign: "center",
        paddingVertical: 30,
        paddingTop: 10,
        fontSize: 20,
    },
    slider: {
        transform: [{ scaleX: .7 }, { scaleY: .7}],
    },
    submit: {
        padding: 5,
        marginVertical: 30,
        backgroundColor: '#2162C2',
        borderColor: 'black',
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        width: 120,
    },
    notesInput: {
        borderColor: '#2162C2',
        borderWidth: 2,
        borderRadius: 25,
        height: 80,
        textAlign: 'center',
        fontSize: 15,
        width: 240 ,
      },
    notesContainer: {
        paddingTop: 30,
        justifyContent: 'space-around',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    }

});
