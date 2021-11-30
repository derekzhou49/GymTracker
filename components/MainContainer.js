import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import WorkoutChecklist from './WorkoutChecklist';
import WorkoutsScreen from './WorkoutsScreen';
import StartWorkout from './StartWorkout';
import AddExercise from './AddExercise';
import VisualizeLogs from './VisualizeLogs';
import HomeScreen from './HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogWorkout from './LogWorkout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStackNavigator = () => {
  return(
      <Stack.Navigator
      screenOptions = {{
        headerShown: false,
      }}>
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
  )
}

export default function MainContainer() {
  return(
      <Tab.Navigator
      screenOptions = {({ route }) => ({
        headerShown: false,
        tabBarStyle: {position: 'absolute', backgroundColor: '#2162C2'},
        tabBarInactiveBackgroundColor: '#2162C2',
        tabBarActiveBackgroundColor: '#2162C2',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name == 'Home') {
            
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name == 'Workouts') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name == 'Temp') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name == 'Progress') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }
          return <Ionicons name = {iconName} size = {size} color = {color}/>;
        },
      })}>
        <Tab.Screen name = "Home" component = {HomeScreen} />
        <Tab.Screen name = "Workouts" component={WorkoutStackNavigator} />
        <Tab.Screen name = "Temp" component = {LogWorkout} />
        <Tab.Screen name = "Progress" component = {VisualizeLogs} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
});