import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';



function HomeScreen(props) {
	const [exerciseList, setExerciseList] = useState([]);

	useEffect(() => {
		getExercises();
	}, [props]);

	async function getExercises() {
		console.log("getting workout data");
		const { data } = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/1/workouts/')
		let totalExercise = []
		console.log(data);
		for (let i = 0; i < data.length; i++) {
			console.log("getting exercise data");
			const exercise = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/1/workouts/' + data[i].id.toString() + '/exercises/');
			console.log(exercise.data);
			console.log(exercise.data.length);
			totalExercise.push(exercise.data)
		}	
		setExerciseList(totalExercise.flat());
		
	}


  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
      <Text style={{ fontSize: 60, color: "#2162C2"}}> Dane </Text>
        <Text style={{ fontSize: 30, color: "#2162C2"}}> Welcome Back! </Text>
      </View>
      <FlatList
      data = {exerciseList}
      renderItem = {itemData => {
			console.log(itemData);
			if (itemData.item.upgrade) {
				return (
				  <TouchableOpacity activeOpacity={.8}>
					<View style = {styles.workoutItem}>
					<Text style = {{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}> {"Exercise: " + itemData.item.name} </Text>
						<Text style = {{fontSize: 25, textAlign: 'center',}}> {"We recomend that you increase your base weight by 5 percent. " + itemData.item.baseWeight + "lbs -> " + (2.5 * Math.ceil(itemData.item.baseWeight * 1.05/2.5)) +"lbs"} </Text>
					</View>
				  </TouchableOpacity>
				);
			}
      }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
    alignContent: 'center',
  },
  title: {
    alignItems: 'center',
    padding: 30,
  },
  workoutItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: '#2162C2',
    borderWidth: 5,
    borderRadius: 25,
    flex: .5,
    margin: 20,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 40
  },
  newWorkout: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    justifyContent: "center",
    elevation: 5,
    height: 200,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowRadius: 10,

},
textInput: {
  height: 40,
  borderRadius: 5,
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  marginBottom: 20,
  marginTop: 10,
  marginLeft: 30,
  marginRight: 10,
},
listView: {
  flexGrow: 0,
  minHeight: 200,
  flexDirection: 'row',  
},
});

export default HomeScreen;
