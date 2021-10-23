import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const DATA = [
    {
        id: '1',
        title: 'Bench Press',
      },
      {
        id: '2',
        title: 'Iso Lateral Wide Chest',
      },
      {
        id: '3',
        title: 'Chest Flys',
      },
      {
        id: '4',
        title: 'Tricep Dips',
      },
]
const Item = ({ title }) => (
    <TouchableOpacity>
        <View style={styles.workoutItem}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{title}</Text>
            <Text style={{ fontSize: 15, textAlign: 'center'}}> 3 sets, 8 reps, 251 lbs </Text>
        </View>
    </TouchableOpacity>
  );

function StartWorkout(props) {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 35, fontWeight: 'bold'}}> Chest and Triceps </Text>
      </View>
      <FlatList 
      keyExtractor = {(item) => item.id}
      data = {DATA}
      renderItem = {renderItem}
        //   <TouchableOpacity activeOpacity={.8}>
        //     <View style = {styles.workoutItem}>
        //         <Text style = {{fontSize: 25, textAlign: 'center',}}> {itemData.item.value} </Text>
        //         <Text style = {{fontSize: 20, textAlign: 'center',}}> Back and Biceps </Text>
        //     </View>
        //   </TouchableOpacity>
      />
      <TouchableOpacity> 
          <View style = {styles.newWorkout}>
            <Text style = {{fontSize: 25, textAlign: 'center', }}> Start Workout </Text>
          </View>
        </TouchableOpacity>  
        <TouchableOpacity> 
          <View style = {styles.newWorkout}>
            <Text style = {{fontSize: 25, textAlign: 'center', }}> Add Exercise </Text>
          </View>
        </TouchableOpacity>  
    </SafeAreaView>
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
  workoutItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderRadius: 25,
    flex: .5,
  },
  newWorkout: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'pink',
    borderColor: 'black',
    borderRadius: 25,
  },
});