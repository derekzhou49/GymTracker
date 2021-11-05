import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

const Graph = (props) => {
	const [graphData, setGraphData] = useState({ x : [], y : []});
	const [change, setChange] = useState(true);
	console.log(props);

	const getGraphData = async () => {
		// use start date, end date, workout, exercise to make request for all the data, then parse and format it
		console.log(change);
		if (props.workout == null || props.exercise == null) {
			return;
		}
		const res = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/1/workouts/' + props.workout.toString() + '/exercises/' + props.exercise.toString() + '/logs/?startDate=' + props.startDate + '&endDate=' + props.endDate);
		const y = res.data.map( log => log.weight );
		const x = res.data.map( log => log.date.split('T')[0]);
		setGraphData( { x: x, y: y } );
		setChange(false);
		console.log(graphData.x);
	};

	const lineDataFormat = () => {
		return ({
			labels: graphData.x,
			datasets: [
				{
					data: graphData.y,
				},
			],
		});
	};

	useEffect(() => {
		getGraphData();
	},
	[props.workout, props.exercise, props.startDate, props.endDate]);
	
	return  (
		<View>
			{ graphData.x.length != 0 ?
			<LineChart
			data={lineDataFormat()}
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
	const [workout, setWorkout] = useState(null)
	const [exercise, setExercise] = useState(null)
	const [workoutList, setWorkoutList] = useState(null);
	const [exerciseList, setExerciseList] = useState(null);
	const [change, setChange] = useState(false);
	
	
	const getWorkouts = async () => {
		// make request and parse data to store ids in workout list
		if (workoutList == null)  {
			const res = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/1/workouts/');
			setWorkoutList(res.data);
			console.log(res.data);
		}
		console.log("workouts: " + workoutList);
	};

	const getExercises = async () => {
		// make request and parse data to store ids in exercise list
		if (exerciseList == null) {
			console.log('here');
			setExerciseList(['Please Choose a Workout']);
		} else if (workout != null && change) {
			const res = await axios.get('https://gym-tracker-mas.herokuapp.com/api/users/1/workouts/' + workout.toString() + '/exercises/');
			setExerciseList(res.data);
			setChange(false);
		}
		console.log("exercises: " + exerciseList);
	};

	useEffect(() => {
		getWorkouts();
		getExercises();
	});

	return (
		<View>
			<Graph exercise={exercise} workout={workout} startDate={startDate} endDate={endDate}/>
			<Text> Workouts </Text>
			<SelectDropdown
				data={ workoutList == null ? ['No Workouts Present'] : workoutList.map(workout => workout.name) }
				onSelect={(selectedItem, index) => {
					setWorkout(workoutList[index].id);
					setExerciseList(null);
					setChange(true);
				}}
				defaultButtonText="Select Workout"
			/>
			<Text> Exercises </Text>
			<SelectDropdown
				data={exerciseList == null ? [] : exerciseList.map(exercise => exercise.name) }
				onSelect={(selectedItem, index) => {
					setExercise(exerciseList[index].id);
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
