import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import WorkoutsScreen from './WorkoutsScreen';

// function GoWorkoutsScreen({ navigation }) {
//   const onPressHandler = () => {
//     navigation.navigate("WorkoutsScreen");
//   }
// }

function WelcomeScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onPressHandler = () => {
    props.navigation.navigate("WorkoutsScreen");
  }

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 40, }}> Welcome to GymTracker! </Text>
      </View>
      <View style={{ padding: 30, }}>
        <Text> Username or Email </Text>
        <TextInput
        placeholder="johndoe@example.com"
        style={styles.input}
        onChangeText={text => setUsername(text)}/>
      </View>
      <View style={{ padding: 30, }}>
        <Text> Password </Text>
        <TextInput
        placeholder="Must have at least 5 characters" 
        style={styles.input}
        onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity>
        <View style={{ padding: 30, }}>
          <Button
          style={{ padding: 10, fontSize: 20 }}
          title="Sign In"
          // for debugging 
          onPress={onPressHandler} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ padding: 30, }}>
          <Button style={{ padding: 10, fontSize: 20 }} title="Create an Accounnt" />
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

export default WelcomeScreen;