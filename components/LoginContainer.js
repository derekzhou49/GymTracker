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
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignupScreen from './SignupScreen';

const LoginStack = createStackNavigator();

const LoginStackNavigator = ({navigation}) => (
    <LoginStack.Navigator
    screenOptions = {
        {headerShown: false}
    } >
        <LoginStack.Screen 
        name = "WelcomeScreen"
        component = {WelcomeScreen}/>
        <LoginStack.Screen 
        name = "SignupScreen"
        component = {SignupScreen}/>
    </LoginStack.Navigator>
);

export default LoginStackNavigator;