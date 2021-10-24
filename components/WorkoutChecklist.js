import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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
          <Text style = {{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}> Workout {workoutNum}</Text>
          <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {workoutName}</Text>
          <View style = {styles.checklist}>
              <Text style = {styles.date}>{date.getMonth()}/{date.getDay()}/{date.getFullYear()}</Text>
              <FlatList
              data={exercises}
              renderItem={({ item }) => {
                  return(
                      <View style = {{flexDirection:'row', paddingTop: 30, justifyContent: 'space-between'}}>
                          <View>
                            <Text>{item.name}</Text>
                          </View>
                          <TouchableOpacity
                          onPress={() => {
                              const idx = exercises.indexOf(item);
                              let newExercises = [...exercises];
                              newExercises.splice(idx, 1, {name: item.name, completed: !item.completed});
                              setExercises(newExercises);
                          }}>
                              <View style = {{alignItems: 'flex-end'}}>
                                {displayIcon(item.completed)}
                              </View>
                          </TouchableOpacity>
                      </View>
                  )
              }} />
          </View>
          <TouchableOpacity> 
            <View style = {styles.back}>
                <Text style = {{fontSize: 25, textAlign: 'center', }}> Back </Text>
            </View>
        </TouchableOpacity>  
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 35
    },
    checklist: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderRadius: 25,
        alignContent: 'space-between',
    },
    date: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    back: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'pink',
        borderColor: 'black',
        borderRadius: 25,
    }
});