import React, { createContext, useState } from "react";

const FitnessItems = createContext({
  completed: [] as any[],
  setCompleted: (items: React.Dispatch<React.SetStateAction<any[]>>) => {},
  workout: 0,
  setWorkout: (value: number) => {},
  calories: 0,
  setCalories: (value: number) => {},
  minutes: 0,
  setMinutes: (value: number) => {},
});

const FitnessContext = ({ children }:any) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems }