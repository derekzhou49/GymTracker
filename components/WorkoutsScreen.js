import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

function WorkoutsScreen(props) {
    const onPressHandler = () => {
      props.navigation.navigate("StartWorkout")
    }

    const [enteredWorkout, setEnteredWorkout] = useState('');
    const [workouts, setWorkouts] = useState([{id: Math.random().toString(), value: "Chest and Triceps"}, {id: Math.random().toString(), value: "Back and Biceps"}, {id: Math.random().toString(), value: "Legs and Shoulders"}]);
    
    const workoutInputHandler = enteredText => {
        setEnteredWorkout(enteredText);
    };

    const addWorkoutHandler = () => {
        setWorkouts(currentWorkouts => [
        ...currentWorkouts,
        { id: Math.random().toString(), value: enteredWorkout }
        ]);
    };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 40, }}> Dane's Workouts </Text>
      </View>
      {/* <View>
        <Text style={{ fontSize: 20, }}> Test</Text>
        <TextInput
            placeholder="New Workout"
            style={styles.input}
            onChangeText={workoutInputHandler}
            value={enteredWorkout}
        />
        <Button title="Test Add" onPress={addWorkoutHandler} />
        </View> */}
      <FlatList 
      keyExtractor = {(item, index) => item.id}
      data = {workouts}
      renderItem = {itemData => (
          <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.navigate("StartWorkout", {screen: "StartWorkout", params: {workoutName: itemData.item.value}})}>
            <View style = {styles.workoutItem}>
                <Text style = {{fontSize: 25, textAlign: 'center',}}> {itemData.item.value} </Text>
            </View>
          </TouchableOpacity>
      )}
      />
      <TouchableOpacity> 
          <View style = {styles.newWorkout}>
            <Text style = {{fontSize: 25, textAlign: 'center', }}> New Workout </Text>
          </View>
        </TouchableOpacity>  
    </SafeAreaView>
  );
}

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
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderRadius: 25,
    flex: .5,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  newWorkout: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'pink',
    borderColor: 'black',
    borderRadius: 25,
  }
});

export default WorkoutsScreen;