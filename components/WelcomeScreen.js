import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';
import { useCardAnimation, createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';

function WelcomeScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useAuth();

  const loginOnPressHandler = () => {
    axios.post('https://gym-tracker-mas.herokuapp.com/auth/login', {
        email: username,
        password: password,
    })
    .then((response) => {
      setUserId(response.data.id);
      props.navigation.replace('MainContainer');
    }, (error) => {
      console.log(error);
      Alert.alert(
        "Error!",
        "Incorrect Username or Password",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });
  }
  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={styles.titleText}> GymTracker </Text>
      </View>
      <View style = {{paddingBottom: 30, paddingTop: 50,}}>
        <TextInput
        autoCapitalize='none'
        autoCorrect = {false}
        placeholder="Enter Username"
        style={styles.input}
        onChangeText={text => setUsername(text)}/>
      </View>
      <View style = {{paddingBottom: 30,}}>
        <TextInput
        autoCapitalize='none'
        autoCorrect = {false}
        secureTextEntry = {true}
        placeholder="Enter Password" 
        style={styles.input}
        onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <Button
          style={{ padding: 10, fontSize: 20 }}
          title= "Sign In"
          color= {'white'}
          onPress={loginOnPressHandler} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.buttonView}>
          <Button 
          style={{ padding: 10, fontSize: 20}} 
          title = "Create an Account" 
          color = {'white'} 
          onPress = {() => props.navigation.navigate('SignupScreen')} />
        </View>
      </TouchableOpacity>
    </View>
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
  titleText: {
    fontSize: 40, 
    color: '#2162C2',
  },
  inputView: {

  },
  input: {
    borderColor: '#2162C2',
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    textAlign: 'center',
    fontSize: 15,
  },
  buttonView: {
    padding: 5,
    marginVertical: 20,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    color: 'white',
  },
});

export default WelcomeScreen;
