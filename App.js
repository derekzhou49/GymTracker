import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import WorkoutChecklist from './components/WorkoutChecklist';
import WorkoutsScreen from './components/WorkoutsScreen';
import StartWorkout from './components/StartWorkout';
import AddExercise from './components/AddExercise';
import VisualizeLogs from './components/VisualizeLogs';
import HomeScreen from './components/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainContainer from './components/MainContainer';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './contexts/AuthContext';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WorkoutStackNavigator = () => {
  return(
      <Stack.Navigator>
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

export default function App() {
  return(
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
        screenOptions = {{
          headerShown: false,
        }}>
          <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen} />

          <Stack.Screen
          name="MainContainer"
          component={MainContainer} />
        </Stack.Navigator>
        {/* <Tab.Navigator
        screenOptions = {({ route }) => ({
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
          <Tab.Screen name = "Temp" component = {WelcomeScreen} />
          <Tab.Screen name = "Progress" component = {VisualizeLogs} />
        </Tab.Navigator> */}
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
