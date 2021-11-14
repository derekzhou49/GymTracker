import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

// function GoWorkoutsScreen({ navigation }) {
//   const onPressHandler = () => {
//     navigation.navigate("WorkoutsScreen");
//   }
// }


function WelcomeScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onPressHandler = () => {
    props.navigation.replace('MainContainer');
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
          onPress={onPressHandler} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style = {styles.buttonView}>
          <Button style={{ padding: 10, fontSize: 20}} title = "Create an Account" color = {'white'} />
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