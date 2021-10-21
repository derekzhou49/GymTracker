import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={{fontSize: 40,}}> Welcome to GymTracker! </Text>
      </View>
      <View style= {{padding: 30,}}>
        <Text> Username or Email </Text>
        <TextInput placeholder="johndoe@example.com" style = {styles.input}/>
      </View>
      <View style= {{padding: 30,}}>
        <Text> Password </Text>
        <TextInput placeholder="Must have at least 5 characters" style = {styles.input}/>
      </View>
      <View style= {{padding: 30,}}>
        <Button style={{padding:10, fontSize: 20}} title="Sign In"/>
        <Button style={{padding:10, fontSize: 20}} title="Create an Accounnt"/>
      </View>
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
    borderBottomColor: 'black', 
    borderBottomWidth: 1,
  }
});
