import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import SliderText from 'react-native-slider-text';

export default function AddExercise(props) {
    let itemExercise = "";
    let itemSets = "";
    let itemReps = "";
    let itemWeight = "";
    let itemNotes = "";
    
    if (props.route.params !== undefined) {
        itemExercise = props.route.params.exercise.title;
        itemSets = props.route.params.exercise.sets;
        itemReps = props.route.params.exercise.reps;
        itemWeight = props.route.params.exercise.weight;
        // itemNotes = props.route.params.exercise.notes;
    }

    const [exercise, setExercise] = useState(itemExercise);
    // const [sets, setSets] = useState(itemSets);
    // const [reps, setReps] = useState(itemReps);
    // const [weight, setWeight] = useState(itemWeight);

    const [setsValue, setSetsValue] = useState(itemSets);
    const [repsValue, setRepsValue] = useState(itemReps);
    const [weightValue, setWeightValue] = useState(itemWeight);

  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={{ fontSize: 40, fontWeight: 'bold'}}> Add an Exercise </Text>
              <TextInput
              style={styles.headerInput}
              placeholder="Exercise Name"
              defaultValue={exercise}
              onChangeText={text => setExercise(text)} />
          </View>

          <View style={styles.inputContainer}>

              <View style = {{height: 100, alignContent: 'space-around'}}>
                {/* <Text style={styles.inputName}>Sets</Text> */}

              <View style = {styles.slider}>
              <SliderText
              minimumTrackTintColor="#000"
              thumbTintColor="#000"
              maximumTrackTintColor="#099"
              maximumValue={10}
              stepValue={1}
              minimumValueLabel="0"
              maximumValueLabel="10"
              onValueChange={(id) => setSetsValue(id)}
              sliderValue={setsValue}/>
              </View>
              </View>

              <View style = {{height: 130, alignContent: 'space-around'}}>
              <Text style={styles.inputName}>Sets</Text>
              <View style = {styles.slider }>
              <SliderText
              minimumTrackTintColor="#000"
              thumbTintColor="#000"
              maximumTrackTintColor="#099"
              maximumValue={25}
              stepValue={1}
              minimumValueLabel="0"
              maximumValueLabel="25"
              onValueChange={(id) => setRepsValue(id)}
              sliderValue={repsValue}/>
              </View>
              </View>

              <Text style={styles.inputName}>Reps</Text>

              <View style = {{height: 120,}}>
              <View style = {styles.slider}>
              <SliderText
              minimumTrackTintColor="#000"
              thumbTintColor="#000"
              maximumTrackTintColor="#099"
              maximumValue={600}
              stepValue={2.5}
              minimumValueLabel="0"
              maximumValueLabel="600"
              onValueChange={(id) => setWeightValue(id)}
              sliderValue={weightValue}/>
              </View>
              </View>
              <Text style={styles.inputName}>Weight</Text>

          </View>

        <TouchableOpacity
        onPress={() => {
            const data = {id: Math.random().toString(),
                title: exercise,
                sets: setsValue,
                reps: repsValue,
                weight: weightValue,
            }
            props.navigation.navigate("StartWorkout", {data})
        }} > 
            <View style = {styles.submit}>
                <Text style = {{fontSize: 30, textAlign: 'center', color: 'white' }}> Submit </Text>
            </View>
        </TouchableOpacity>  
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        textAlign: "center",
        paddingTop: 50,
        alignItems: 'center',
        paddingBottom: 20,
    },
    headerInput: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputName: {
        textAlign: "center",
        fontSize: 30,
    },
    inputs: {
        textAlign: "center",
        paddingVertical: 30,
        paddingTop: 10,
        fontSize: 20,
    },
    slider: {
        transform: [{ scaleX: .7 }, { scaleY: .7}],
    },
    submit: {
        padding: 20,
        marginVertical: 40,
        backgroundColor: '#2162C2',
        borderColor: 'black',
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
    },
});
