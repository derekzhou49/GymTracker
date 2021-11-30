import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';

// function GoWorkoutsScreen({ navigation }) {
//   const onPressHandler = () => {
//     navigation.navigate("WorkoutsScreen");
//   }
// }

var myID = "";


function WelcomeScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginOnPressHandler = () => {
    axios.post('https://gym-tracker-mas.herokuapp.com/auth/login', {
        email: username,
        password: password,
    })
    .then((response) => {
      console.log(response.data);
      myID = response.data.id;
      console.log(response.data.id);
      props.navigation.replace('MainContainer');
    }, (error) => {
      console.log(error);
    });
  }

  const registerOnPressHandler = () => {
    axios.post('https://gym-tracker-mas.herokuapp.com/auth/register', {
        email: username,
        name: username,
        password: password,
    })
    .then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 40, color: '#2162C2'}}> GymTracker </Text>
      </View>
      <View style = {{paddingBottom: 30, paddingTop: 50,}}>
        <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={text => setUsername(text)}/>
      </View>
      <View style = {{paddingBottom: 30, fontSize: 50,}}>
        <TextInput
        placeholder="Password" 
        style={styles.input}
        onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity>
        <View style={styles.buttonView}>
          <Button
          style={{ padding: 10, fontSize: 20 }}
          title= "Sign In"
          color= {'white'}
          // for debugging 
          onPress={loginOnPressHandler} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.buttonView}>
          <Button 
          style={{ padding: 10, fontSize: 20}} 
          title = "Create an Account" 
          color = {'white'} 
          onPress={registerOnPressHandler} />
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
  input: {
    borderColor: '#2162C2',
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
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