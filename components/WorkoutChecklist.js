import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function WorkoutChecklist(props) {
    let params = props.route.params.workout;
    const [exercises, setExercises] = useState(params);
    const [userId, setUserId] = useAuth();
    const workoutId = params[0].workoutId;
    const [logList, setLogList] = useState([]);
    const [update, setUpdate] = useState();
    const date = new Date();

    console.log("Loglist for workout checklist are");
    console.log(logList)

    if (logList.length === 0) {
        let localLogList = exercises.map((item, index) => {
            let logItem = {};
            logItem.reps = item.baseReps;
            logItem.sets = item.baseSets;
            logItem.weight = item.baseWeight;
            logItem.exerciseId = item.id;
            logItem.name = item.name;
            logItem.notes = "";
            logItem.index = index;
            logItem.completed = false;
            return logItem;
        });
        setLogList(localLogList);
    }
    if (props.route.params.workoutLog != undefined) {
        const updateLog = Object.assign({}, props.route.params.workoutLog);
        props.route.params.workoutLog = undefined
        setLogList(prev => {
            prev[updateLog.index] = updateLog;
            return prev;
        })
    }

    const submitLog = (logItem, index) => {
        axios.post(`https://gym-tracker-mas.herokuapp.com/api/users/${userId}/workouts/${workoutId}/exercises/${logItem.exerciseId}/logs`, logItem)
        .then(response => {
            const incIndex = index + 1;
            if (incIndex < logList.length) {
                submitLog(logList[incIndex], incIndex);
            } else {
                props.navigation.navigate("WorkoutsScreen");
            }
        });
    };

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
          <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {props.route.params.workoutName}</Text>
          <View style = {styles.checklist}>
              <Text style = {styles.date}>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
              <FlatList
              data={logList}
              renderItem={({ item }) => {
                  return(
                      <View style = {styles.checklist, {flexDirection:'row', paddingTop: 30, justifyContent: 'space-between'}}>
                          <View>
                              <TouchableOpacity
                               onPress={() => props.navigation.navigate('LogWorkout', {exercise: item, exercises: exercises, workoutName: props.route.params.workoutName})}>
								  <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.name}</Text>
                              </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                          onPress={() => {
                              let newItem = Object.assign({}, item);
                              newItem.completed = !newItem.completed;
                              setLogList(prev => {
                                  prev.splice(newItem.index, 1, newItem);
                                  return prev;
                              });
                              setUpdate(prev => !prev);
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
              const alertOptions = [{
                  text: "No",
                  style: "cancel",
                  onPress: () => console.log("Submit cancelled"),
              },
              {
                  text: "Yes",
                  onPress: () => submitLog(logList[0], 0)
              }];
              Alert.alert("Wait!", "Are you sure you want to submit your current workout session?", alertOptions)
          }}>
              <View style={styles.back}>
                  <Text style={{fontSize: 25, textAlign: 'center', color: 'white' }}>Submit Workout Log</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => {
                Alert.alert("Wait!", "If you go back now, your current workout log will not be saved. Are you sure you want to go back?",
                [{text: "Yes", onPress: () => props.navigation.navigate("WorkoutsScreen")}, {text: "No", style: "cancel"}])
          }}> 
            <View style = {styles.back}>
                <Text 
                style = {{fontSize: 25, textAlign: 'center', color: 'white' }}> Go Back </Text>
            </View>
        </TouchableOpacity>
          {/* <TouchableOpacity
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
        </TouchableOpacity>   */}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 35,
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
