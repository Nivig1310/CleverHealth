<<<<<<< HEAD
import React from "react";
import axios from 'axios';
=======
import React, { useContext, useState } from 'react';
import UserProvider from "../contexts/UserProvider.jsx";
>>>>>>> 83fdbbf718fe28d2d7aa574e973a43a42d435128
import { Dropdown, Option } from "./WorkoutGeneratorComponents/DropDown.js";
import {
  FormWrapper,
  Wrapped,
  StyledButton,
} from "./WorkoutGeneratorComponents/stylesDropDown.js";
import AuthenticatedUser from '../components/AuthenticatedUser';
import axios from 'axios';

const WG = () =>
{
  const userData = useContext(UserProvider.Context);
  const [selectedExercises,setSelectedExercises] = useState("1");
  const [selectedDiff,setSelectedDiff] = useState("Easy");

  function handleSelect(event) {
    event.stopPropagation();

    //checks which dropdown is selected and changes correct variable
    if(event.target.id == "1")
    {
      setSelectedDiff(event.target.value);
    }
    else if ((event.target.id == "2")){
      setSelectedExercises(event.target.value);
    }
    
  }

  //called when submit button clicked
  function handleSubmit(event) {
    event.preventDefault();

    //make post requests
    console.log(userData.providerId);
    const body = {
      difficulty: selectedDiff,
      numExercises: selectedExercises
    };
    axios.post("http://localhost:5001/workout/" + userData.providerId, body);
  }

  return (

    //found in sytle.scss
    <div className="img-background">
        <FormWrapper
          //action needs to be changed
          action="/workoutgenerator"
        >
        <div>
          <h1>Create New Workout</h1>
          </div>
          
          <Wrapped>
            <Dropdown
              buttonName="Choose Difficulty"
              id = "1"
              value={selectedDiff}
              onChange={handleSelect}
            >
              <Option value="Easy" />
              <Option value="Medium" />
              <Option value="Hard" />
            </Dropdown>
            <Dropdown
              buttonName="Choose Number of Exercises"
              id = "2"
              value={selectedExercises}
              onChange={handleSelect}
            >
              <Option value="1" />
              <Option value="2" />
              <Option value="3" />
              <Option value="4" />
              <Option value="5" />
              <Option value="6" />
            </Dropdown>
          </Wrapped>
          <StyledButton type="submit" value="Generate Workout" onClick={handleSubmit}/>
          <p>You selected {selectedExercises},{selectedDiff} </p>
        </FormWrapper>
    </div>
  )
};

export default WG;