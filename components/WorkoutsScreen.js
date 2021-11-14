import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

function WorkoutsScreen(props) {
    const onPressHandler = () => {
      props.navigation.navigate("StartWorkout")
    }
    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () => {
      setModalVisible(!isModalVisible);
  };

    const workoutData = [
      {id: '1', value: "Chest and Triceps"},
      {id: '2', value: "Back and Biceps"},
      {id: '3', value: "Legs and Shoulders"}];
      
    const [enteredWorkout, setEnteredWorkout] = useState("");
    const [workouts, setWorkouts] = useState(workoutData);
    
    const workoutInputHandler = enteredText => {
        setEnteredWorkout(enteredText);
    };

    const addWorkoutHandler = () => {
        // let add = false
        // const options = [
        //   {text: "Yes", onPress: () => {
        //     setWorkouts(currentWorkouts => [
        //       ...currentWorkouts,
        //       { id: workoutData.length + 1, value: enteredWorkout }
        //       ]);
        //   }},
        //   {text: "No", style: "cancel"}
        // ]
        // Alert.alert("Confirm", `Are you sure you want to add the workout "${enteredWorkout}"?`, options)
        setWorkouts(currentWorkouts => [
                ...currentWorkouts,
                { id: workoutData.length + 1, value: enteredWorkout }
                ]);
        setEnteredWorkout("");
        toggleModalVisibility();
    };

  return (
    <SafeAreaView style={styles.screen} >
      <View style={styles.title}>
        <Text style={{ fontSize: 40, fontWeight: 'bold'}}> Workouts </Text>
      </View>
      {/* <View>
        <Text style={{ fontSize: 20, textAlign: "center" }}> Add a New Workout</Text>
        <TextInput
            placeholder="Workout Name"
            style={styles.input}
            onChangeText={workoutInputHandler}
            value={enteredWorkout}
        />
        <Button
        title="Add Workout"
        onPress={addWorkoutHandler} />
        </View> */}
      <View style = {{maxHeight: 450,}}>
      <FlatList
      initialNumToRender = {2}
      keyExtractor = {(item, index) => item.id.toString()}
      data = {workouts}
      renderItem = {itemData => (
          <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.navigate("StartWorkout", {screen: "StartWorkout", params: {workoutName: itemData.item.value}})}>
            <View style = {styles.workoutItem}>
            <Text style = {{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}> {"Workout " + itemData.item.id} </Text>
                <Text style = {{fontSize: 25, textAlign: 'center',}}> {itemData.item.value} </Text>
            </View>
          </TouchableOpacity>
      )}
      />
      </View>
      <TouchableOpacity onPress = {toggleModalVisibility}> 
          <View style = {styles.newWorkout}>
            <Text style = {{fontSize: 30, textAlign: 'center', color: 'white'}}> Add Workout </Text>
          </View>
        </TouchableOpacity>  
        <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style = {{textAlign: 'center', fontWeight: 'bold'}}> Workout Name </Text>
                        <TextInput placeholder="Enter Workout Name" 
                                   value={enteredWorkout} style={styles.textInput} 
                                   onChangeText={workoutInputHandler} />
  
                        {/** This button is responsible to close the modal */}
                        <Button title= "Add" onPress={addWorkoutHandler} />
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
  },
  title: {
    alignItems: 'center',
    // padding: 30,
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

export default WorkoutsScreen;