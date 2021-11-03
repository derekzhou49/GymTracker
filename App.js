import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import WorkoutChecklist from './components/WorkoutChecklist';
import WorkoutsScreen from './components/WorkoutsScreen';
import StartWorkout from './components/StartWorkout';
import AddExercise from './components/AddExercise';
import VisualizeLogs from './components/VisualizeLogs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="VisualizeLogs"
        component={VisualizeLogs} />

        <Stack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen} />

        <Stack.Screen
        name="StartWorkout"
        component={StartWorkout} />

        <Stack.Screen
        name="WorkoutChecklist"
        component={WorkoutChecklist} />

        <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen} />

        <Stack.Screen
        name="AddExercise"
        component={AddExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
