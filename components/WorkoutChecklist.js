import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLog, useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function WorkoutChecklist(props) {
    let params = props.route.params.workout;
    const [exercises, setExercises] = useState(params);
    const [logList, setLogList] = useLog();
    const [userId, setUserId] = useAuth();
    const date = new Date();
    const workoutId = params[0].workoutId;
    console.log("Context is")
    console.log(logList);

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

    if (logList.length === 0) {
        let localLogList = exercises.map((item, index) => {
            let logItem = {};
            logItem.reps = item.baseReps;
            logItem.sets = item.baseSets;
            logItem.weight = item.baseWeight;
            logItem.exerciseId = item.id;
            logItem.name = item.name;
            logItem.notes = "";
            logItem.checked = false;
            logItem.index = index;
            return logItem;
        });
        setLogList(localLogList);
    }

    console.log("LogList is")
    console.log(logList)

    const submitLog = (logItem, index) => {
        axios.post(`https://gym-tracker-mas.herokuapp.com/api/users/${userId}/workouts/${workoutId}/exercises/${logItem.exerciseId}/logs`, logItem)
        .then(response => {
            const incIndex = index + 1;
            if (incIndex < logList.length) {
                submitLog(logList[incIndex], incIndex);
            } else {
                setLogList([]);
                props.navigation.navigate("WorkoutsScreen");
            }
        });
    };

  return(
      <SafeAreaView>
          <Text style = {{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}> Workout Checklist </Text>
          <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {params.workoutName}</Text>
          <View style = {styles.checklist}>
              <Text style = {styles.date}>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
              <FlatList
              data={logList}
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
                              console.log(item)
                            //   let replacementLog = [...logList];
                            //   replacementLog[item.index].checked = !logList[item.index].checked;
                            //   setLogList(replacementLog);
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
                style = {{fontSize: 25, textAlign: 'center', color: 'white' }}> Go Back </Text>
            </View>
        </TouchableOpacity>  
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
