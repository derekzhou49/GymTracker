import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import WorkoutChecklist from './WorkoutChecklist';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function StartWorkout(props) {

  let params = props.route.params.params;

  const [userId, setUserId] = useAuth();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises()
  }, [props]);

  async function getExercises() {
    const { data } = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + params.workoutID.toString() + '/exercises/');
    setExercises(data);
  }
    
  const onPressHandler = () => {
    props.navigation.navigate("WorkoutChecklist", {workout: exercises, workoutName: params.workoutName});
  }

  const renderItem = item => {
    return (
      <TouchableOpacity
      onPress={async () => {
		  await axios.delete('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + params.workoutID.toString() + '/exercises/' + item.item.id.toString());
		  getExercises();
      }}>
        <View style={styles.workoutItem}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.item.name}</Text>
            <Text style={{ fontSize: 15, textAlign: 'center'}}> {item.item.baseSets} sets, {item.item.baseReps} reps, {item.item.baseWeight} lbs </Text>
        </View>
      </TouchableOpacity>
    )
  };

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
      <View style = {{maxHeight: 440}}>
        <FlatList 
        keyExtractor = {(item) => item.id}
        data = {exercises}
        renderItem = {renderItem}
        />
      </View>
      <TouchableOpacity> 
          <View style = {styles.buttons}>
            <TouchableOpacity
            onPress={onPressHandler}>
              <Text style = {{fontSize: 25, textAlign: 'center', color: 'white'}}> Start Workout </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>  
        <TouchableOpacity
        onPress={() => props.navigation.navigate("AddExercise", {workoutID: params.workoutID, workoutName: params.workoutName})}> 
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
    marginVertical: 15,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
  },
});
