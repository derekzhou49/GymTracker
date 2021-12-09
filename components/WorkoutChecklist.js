import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

export default function WorkoutChecklist(props) {
    // Will fetch these from the server once connected to backend
    let params = props.route.params;
	console.log("checklist params");
    console.log(params);

    const [exercises, setExercises] = useState(params.workout);
    console.log(exercises)
    const date = new Date();

    const displayIcon = (state) => {
        if (!state) {
            return(<AntDesign name="closecircle" size={24} color="red" />)
        } else {
            return(<AntDesign name="checkcircle" size={24} color="green" />)
        }
    }

    const isCompleted = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].completed == false) {
                return false;
            }
        }
        return true;
    }

  return(
      <SafeAreaView>
          <Text style = {{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}> Workout Checklist </Text>
          <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {params.workoutName}</Text>
          <View style = {styles.checklist}>
              <Text style = {styles.date}>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
              <FlatList
              data={exercises}
              renderItem={({ item }) => {
                  return(
                      <View style = {styles.checklist, {flexDirection:'row', paddingTop: 30, justifyContent: 'space-between'}}>
                          <View>
                              <TouchableOpacity
                               onPress={() => props.navigation.navigate('LogWorkout', {exercise: item})}>
								  <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.name}</Text>
                              </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                          onPress={() => {
                              console.log("Press Handler")
                            //   const idx = exercises.indexOf(item);
                            //   let newExercises = [...exercises];
                            //   newExercises.splice(idx, 1, {name: item.name, completed: !item.completed});
                            //   setExercises(newExercises);
                          }}>
                              <View style = {{alignItems: 'flex-end'}}>
                                {displayIcon(item.completed)}
                              </View>
                          </TouchableOpacity>
                      </View>
                  )
              }} />
          </View>
          <TouchableOpacity
          onPress={() => {
              let completed = isCompleted(exercises);
              if (completed) {
                props.navigation.navigate("WorkoutsScreen")
              } else {
                  Alert.alert("Wait!", "You haven't finished your workout yet. Are you sure you want to go back now?",
                  [{text: "Yes", onPress: () => props.navigation.navigate("WorkoutsScreen")}, {text: "No", style: "cancel"}])
              }
          }}> 
            <View style = {styles.back}>
                <Text 
                style = {{fontSize: 25, textAlign: 'center', color: 'white' }}> Done </Text>
            </View>
        </TouchableOpacity>  
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 35,
        // backgroundColor: 'white',
    },
    checklist: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: '#2162C2',
        borderWidth: 5,
        borderRadius: 25,
        alignContent: 'space-between',
    },
    date: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    back: {
        padding: 10,
        marginVertical: 20,
        backgroundColor: '#2162C2',
        borderColor: 'black',
        borderRadius: 25,
        marginLeft: 30,
        marginRight: 30,
    }
    
});
