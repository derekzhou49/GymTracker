import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-datepicker';


const Graph = (props) => {
	const [graphData, setGraphData] = useState(props.props);
	const lineData = {
		labels: graphData.x,
		datasets: [
			{
				data: graphData.y,
			},
		],
	};
	return (
		<View>
			{ graphData.x.length != 0 ?
			<LineChart
			data={lineData}
			width={Dimensions.get('window').width} // from react-native
			height={220}
			yAxisSuffix='lb'
			chartConfig={{
			  backgroundColor: '#e26a00',
			  backgroundGradientFrom: '#fb8c00',
			  backgroundGradientTo: '#ffa726',
			  decimalPlaces: 1, // optional, defaults to 2dp
			  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			  style: {
				borderRadius: 16
			  }
			}}
			bezier
			style={{
			  marginVertical: 8,
			  borderRadius: 16
			}}
			/> :
			<Text> No Data to display </Text> }
		</View>
	);
}

const VisualizeLogs = (props) => {
	const [startDate, setStartDate] = useState("11-02-2021");
	const [endDate, setEndDate] = useState("11-02-2021")
	const [workout, setWorkout] = useState("")
	const [exercise, setExercise] = useState("")
	const [workoutList, setWorkoutList] = useState("")
	const [exerciseList, setExerciseList] = useState("")
	
	const getGraphData = () => {
		// use start date, end date, workout, exercise to make request for all the data, then parse and format it
		return { x: [1,3, 6], y: [5,7,1] };
	};
	
	const getWorkouts = () => {
		// make request and parse data to store ids in workout list
		return ['workout1', 'workout2', 'workout3'];
	};

	const getExercises = () => {
		// make request and parse data to store ids in exercise list
		return ['exercise1', 'exercise2', 'exercise3'];
	};

	return (
		<View>
			<Graph props={getGraphData()}/>
			<Text> Workouts </Text>
			<SelectDropdown
				data={ getWorkouts() }
				onSelect={(selectedItem, index) => {
					setWorkout(workoutList[index]);
				}}
				defaultButtonText="Select Workout"
			/>
			<Text> Exercises </Text>
			<SelectDropdown
				data={ getExercises() }
				onSelect={(selectedItem, index) => {
					setExercise(exerciseList[index]);
				}}
				defaultButtonText="Select Exercise"
			/>
			<Text> Start and End Date </Text>
			<DatePicker
				date={startDate} //initial date from state
				mode="date" //The enum of date, datetime and time
				placeholder="Select Start Date"
				format="MM-DD-YYYY"
				minDate="01-01-2016"
				maxDate="01-01-2023"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{
				dateIcon: {
				  //display: 'none',
				  position: 'absolute',
				  left: 0,
				  top: 4,
				  marginLeft: 0,
				},
				dateInput: {
					marginLeft: 36,
				},
				}}
				onDateChange={(date) => {
					setStartDate(date);
				}}
			/>
			<DatePicker
				date={endDate} //initial date from state
				mode="date" //The enum of date, datetime and time
				placeholder="Select End Date"
				format="MM-DD-YYYY"
				minDate="01-01-2016"
				maxDate="01-01-2023"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{
				dateIcon: {
				  //display: 'none',
				  position: 'absolute',
				  left: 0,
				  top: 4,
				  marginLeft: 0,
				},
				dateInput: {
					marginLeft: 36,
				},
				}}
				onDateChange={(date) => {
					setEndDate(date);
				}}
			/>
		</View>
	);
}
export default VisualizeLogs;
