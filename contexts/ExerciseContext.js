import React, {useState, useContext} from 'react';

const WorkoutContext = React.createContext();
const ExerciseContext = React.createContext();

export const useWorkout = ()  => {
    return useContext(WorkoutContext);
}

export const useExercise = () => {
    return useContext(ExerciseContext);
}

/*
TO USE: const {currentUser} = useAuth()
Do this call similar to how useState is called
*/

const WorkoutProvider = ({children}) => {
    const [workout, setWorkout] = useState('12');
    const [exercises, setExercises] = useState([]);

    return (
        <WorkoutContext.Provider value={[workout, setWorkout]}>
            <ExerciseContext.Provider value={[exercises, setExercises]}>
                {children}
            </ExerciseContext.Provider>
        </WorkoutContext.Provider>
    );
};

export default WorkoutProvider;
