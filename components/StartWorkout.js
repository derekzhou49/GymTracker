import { TabRouter } from '@react-navigation/routers';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import WorkoutChecklist from './WorkoutChecklist';
import { CHEST_TRI, BACK_BI, LEG_SHOULDER } from './../testing/data'

var DATA1 = [CHEST_TRI, BACK_BI, LEG_SHOULDER]

// Dummy data
// Delete when connected to backend
// var DATA = [
//     {
//         id: '1',
//         title: 'Bench Press',
//         reps: "8",
//         sets: "3",
//         weight: "135",
//         notes: "first exercise"
//       },
//       {
//         id: '2',
//         title: 'Iso Lateral Wide Chest',
//         reps: "10",
//         sets: "4",
//         weight: "150",
//         notes: "second exercise"
//       },
//       {
//         id: '3',
//         title: 'Chest Flys',
//         reps: "12",
//         sets: "3",
//         weight: "80",
//         notes: "third exercise"
//       },
//       {
//         id: '4',
//         title: 'Assisted Tricep Dips',
//         reps: "11",
//         sets: "4",
//         weight: "25",
//         notes: "fourth exercise"
//       },
// ]

function StartWorkout(props) {

  // Start the workout
  // For testing purposes, later change to fetch workout data from database
  let params = props.route.params.params;
  let workoutID = parseInt(params.workoutID) - 1;
  const [exercises, setExercises] = useState(DATA1[workoutID].workout);
    
  const onPressHandler = () => {
    props.navigation.navigate("WorkoutChecklist");
  }
  

  // Function to render each item
  const renderItem = item => {
    return (
      <TouchableOpacity
      onPress={() => {
        setExercises(exercises.filter(exercise => exercise.id !== item.item.id))
      }} >
        <View style={styles.workoutItem}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.item.title}</Text>
            <Text style={{ fontSize: 15, textAlign: 'center'}}> {item.item.sets} sets, {item.item.reps} reps, {item.item.weight} lbs </Text>
        </View>
      </TouchableOpacity>
    )};

      if ((props.route.params !== undefined) && (props.route.params.data !== undefined)) {
        const newData = props.route.params.data;
        props.route.params.data = undefined
        setExercises(prevExercises => [...prevExercises, newData])
      }
  
      
      return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 35, fontWeight: 'bold'}}> {params.workoutName} </Text>
      </View>
      <FlatList 
      keyExtractor = {(item) => item.id}
      data = {exercises}
      renderItem = {renderItem}
      />
      <TouchableOpacity> 
          <View style = {styles.buttons}>
            <TouchableOpacity
            onPress={onPressHandler}>
              <Text style = {{fontSize: 25, textAlign: 'center', color: 'white'}}> Start Workout </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>  
        <TouchableOpacity
        onPress={() => props.navigation.navigate("AddExercise")}> 
          <View style = {styles.buttons}>
            <Text style = {{fontSize: 25, textAlign: 'center', color: 'white'}}> Add Exercise </Text>
          </View>
        </TouchableOpacity>  
    </SafeAreaView>
    );
  }

export default StartWorkout;

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  title: {
    alignItems: 'center',
    padding: 30,
  },
  workoutItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: '#2162C2',
    borderWidth: 5,
    borderRadius: 25,
    flex: .5,
    margin: 20,
  },
  buttons: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
  },
});