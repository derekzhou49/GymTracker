import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

console.disableYellowBox = true;

function HomeScreen(props) {
	const [exerciseList, setExerciseList] = useState([]);
  const [userId, setUserId] = useAuth();

	useEffect(() => {
		getExercises();
	}, [props]);


	async function getExercises() {
		const { data } = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/')
		let totalExercise = []
		for (let i = 0; i < data.length; i++) {
			const exercise = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + data[i].id.toString() + '/exercises/');
			totalExercise.push(exercise.data)
		}	
		setExerciseList(totalExercise.flat());
	}

  const logoutOnPressHandler = () => {
    setUserId(-1)
    props.navigation.replace('LoginContainer');
  }


  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
      onPress={logoutOnPressHandler}>
        <View style = {styles.buttons}>  
          <Text style = {{fontSize: 25, textAlign: 'center', color: 'white'}}> Sign out </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={{ fontSize: 30, color: "#2162C2"}}> Welcome Back! </Text>
      </View>
      <FlatList
      data = {exerciseList}
      renderItem = {itemData => {
			console.log(itemData);
			if (itemData.item.upgrade) {
				return (
					<View style = {styles.notification}>
					<Text style = {{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}> {"Exercise: " + itemData.item.name} </Text>
						<Text style = {{fontSize: 20, textAlign: 'center',}}> {"We recomend that you increase your base weight by 5 percent. "} </Text>
            <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style = {{fontSize: 25, textAlign: 'center', color: 'red'}}> {itemData.item.baseWeight + "lbs "} </Text>
              <FontAwesome5
                  color = 'black'
                  size = '35'
                  name = 'long-arrow-alt-right'/>
              <Text style = {{fontSize: 25, textAlign: 'center', color: 'green'}}> {(5 * Math.ceil(itemData.item.baseWeight * 1.05/5)) +"lbs"} </Text>
						</View>
            <View style = {styles.options}>
              <TouchableOpacity
              onPress={async () => {
                await axios.put('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + itemData.item.workoutId.toString() + '/exercises/' + itemData.item.id + '/dismiss')
                getExercises();
                }}>
                <View style = {{borderWidth: 2, borderColor: 'black', width: Dimensions.get('window').width/3}}>
                  <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>Dismiss</Text>
                </View>  
              </TouchableOpacity>
              <TouchableOpacity
              onPress={async () => {
                await axios.put('https://gym-tracker-mas.herokuapp.com/api/users/' + userId.toString() + '/workouts/' + itemData.item.workoutId.toString() + '/exercises/' + itemData.item.id.toString() + '/accept',
                {
                  baseWeight: (5 * Math.ceil(itemData.item.baseWeight * 1.05/5))
                });
                getExercises();
                }}
                >
                <View style = {{borderWidth: 2, borderColor: 'black', width: Dimensions.get('window').width/3}}>
                  <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>Accept</Text>
                </View>   
              </TouchableOpacity>
            </View>
					</View>
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
    height: Dimensions.get('window').height,
    alignContent: 'center',
    borderColor: 'black',
  },
  title: {
    alignItems: 'center',
    padding: 30,
  },
  notification: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 5,
    margin: 20,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 40
  },
  buttons: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#2162C2',
    borderColor: 'black',
    borderRadius: 25,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'flex-end'
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
