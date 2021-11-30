import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'



function SignupScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const registerOnPressHandler = () => {
        axios.post('https://gym-tracker-mas.herokuapp.com/auth/register', {
            email: email,
            name: username,
            password: password,
        })
        .then((response) => {
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });
        Alert.alert(
          "Success!",
          "Account Created",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        props.navigation.navigate('WelcomeScreen')
    }

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 40, color: '#2162C2'}}> Register! </Text>
      </View>
      <View style = {{paddingBottom: 30, paddingTop: 50,}}>
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center'}}> Email </Text>
        <TextInput
        autoCapitalize='none'
        placeholder="Enter Email"
        style={styles.input}
        onChangeText={text => setEmail(text)}/>
      </View>
      <View style = {{paddingBottom: 30}}>
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center'}}> Username </Text>
        <TextInput
        autoCapitalize='none'
        placeholder="Enter Username"
        style={styles.input}
        onChangeText={text => setUsername(text)}/>
      </View>
      <View style = {{paddingBottom: 30, fontSize: 50,}}>
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center'}}> Password </Text>
        <TextInput
        autoCapitalize='none'
        
        placeholder="Enter Password" 
        style={styles.input}
        onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.buttonView}>
          <Button 
          style={{ padding: 10, fontSize: 20}} 
          title = "Create Account" 
          color = {'white'} 
          onPress = {registerOnPressHandler} />
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
    fontSize: 15,
  },
  buttonView: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
  }
});

export default SignupScreen;