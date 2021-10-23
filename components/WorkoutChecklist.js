import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function WorkoutChecklist() {
    // Will fetch these from the server once connected to backend
    const workoutNum = 2;
    const workoutName = "Chest and Triceps";
    let exerciseData = [{name: "Bench Press", completed: false}, {name: "Iso Lateral Wide Chest", completed: false}, {name: "Chest Flys", completed: false}, {name: "Tricep Dips", completed: false}];
    const [exercises, setExercises] = useState(exerciseData)
    const date = new Date();

    const displayIcon = (state) => {
        if (!state) {
            return(<AntDesign name="closecircle" size={24} color="red" />)
        } else {
            return(<AntDesign name="checkcircle" size={24} color="green" />)
        }
    }

  return(
      <SafeAreaView>
          <Text>Workout {workoutNum}</Text>
          <Text>{workoutName}</Text>
          <View>
              <Text>{date.getMonth()}/{date.getDay()}/{date.getFullYear()}</Text>
              <FlatList
              data={exercises}
              renderItem={({ item }) => {
                  return(
                      <View>
                          <Text>{item.name}</Text>
                          <TouchableOpacity
                          onPress={() => {
                              const idx = exercises.indexOf(item);
                              let newExercises = [...exercises];
                              newExercises.splice(idx, 1, {name: item.name, completed: !item.completed});
                              setExercises(newExercises);
                          }}>
                              {displayIcon(item.completed)}
                          </TouchableOpacity>
                      </View>
                  )
              }} />
          </View>
          <Button title="Back"/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 35
    }
});