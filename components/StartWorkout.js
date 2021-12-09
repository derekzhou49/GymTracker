import { TabRouter } from '@react-navigation/routers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import WorkoutChecklist from './WorkoutChecklist';
import { CHEST_TRI, BACK_BI, LEG_SHOULDER } from './../testing/data';
import { useAuth } from '../contexts/AuthContext';
import { useWorkout } from '../contexts/WorkoutContext';
import axios from 'axios';

var DATA1 = [CHEST_TRI, BACK_BI, LEG_SHOULDER]

function StartWorkout(props) {

  // Start the workout
  // For testing purposes, later change to fetch workout data from database
  let params = props.route.params.params;
  let workoutID = parseInt(params.workoutID) - 1;

  const [userId, setUserId] = useAuth();
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
		getExercises()
	}, [props]);

  async function getExercises() {
		console.log("getting exercises");
		const { data } = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + params.workoutID.toString() + '/exercises/');
		console.log(data);
		setExercises(data);
	}
    
  const onPressHandler = () => {
    props.navigation.navigate("WorkoutChecklist", {workout: exercises, workoutName: params.workoutName});
  }
  // Function to render each item
  const renderItem = item => {
    return (
      <TouchableOpacity
      onPress={() => {
        setExercises(exercises.filter(exercise => exercise.id !== item.item.id))
      }} >
        <View style={styles.workoutItem}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.item.name}</Text>
            <Text style={{ fontSize: 15, textAlign: 'center'}}> {item.item.baseSets} sets, {item.item.baseReps} reps, {item.item.baseWeight} lbs </Text>
        </View>
      </TouchableOpacity>
    )};

      if ((props.route.params !== undefined) && (props.route.params.data !== undefined)) {
        const newData = props.route.params.data;
        props.route.params.data = undefined
        setExercises(prevExercises => [...prevExercises, newData])
      }
      console.log(params)
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