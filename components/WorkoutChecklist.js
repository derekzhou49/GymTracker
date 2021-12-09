import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import LogProvider, { useLog } from '../contexts/LogContext';
import { AntDesign } from '@expo/vector-icons';

export default function WorkoutChecklist(props) {
    let params = props.route.params.workout;
    const [exercises, setExercises] = useState(params);
    // console.log(useLog())
    const [logList, setLogList] = useLog();
    const date = new Date();

    // if (logList.length === 0) {
    //     let localLogList = exercises.map(item => {
    //         let logItem = {};
    //         logItem.reps = item.baseReps;
    //         logItem.sets = item.baseSets;
    //         logItem.weight = item.baseWeight;
    //         logItem.exerciseId = item.id;
    //         logItem.name = item.name;
    //         logItem.notes = "";
    //         return logItem;
    //     });
    //     setLogList(localLogList);
    // }
    
    console.log("Log list is");
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

  return(
      <LogProvider>
        <SafeAreaView>
            <Text style = {{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}> Workout Checklist </Text>
            <Text style = {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {params.workoutName}</Text>
            <View style = {styles.checklist}>
                <Text style = {styles.date}>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
                <FlatList
                data={exercises}
                renderItem={({ item }) => {
                    return(
                        <View style = {{flexDirection:'row', paddingTop: 30, justifyContent: 'space-between'}}>
                            <View>
                                <TouchableOpacity
                                onPress={() => props.navigation.navigate('LogWorkout', {exercise: item})}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                            onPress={() => {
                                console.log("Press Handler")
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
      </LogProvider>
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