import classes from "./Measurements.module.css";
import Axios from 'axios';
import { useRef, useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import SingleMeasurement from './SingleMeasurement';

const Measurements = () => {
  const [weights, setWeights] = useState([]);
  const [steps, setSteps] = useState([]);
  const [pulses, setPulses] = useState([]);

  const authContext = useContext(AuthContext);
  const userId = authContext.id;

  const measurement = useRef();
  const date = useRef();
  const val = useRef();
  const method = useRef();

  useEffect(() => {
    Axios.post("http://localhost:3001/get/measurements", {id: userId, measurement: weights}).then( (res) => {
      setWeights(res.data);
    })
    Axios.post("http://localhost:3001/get/measurements", {id: userId, measurement: steps}).then( (res) => {
      setSteps(res.data);
    })
    Axios.post("http://localhost:3001/get/measurements", {id: userId, measurement: pulses}).then( (res) => {
      setPulses(res.data);
    })
  }, [userId])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(measurement.current.value.trim() === "" || date.current.value.trim() === "" || val.current.value.trim() === "") {
      alert("You need to fill everything!")
      return;
    }

    Axios.post("http://localhost:3001/insert/measurment", {
      userId: authContext.id,
      measurment: measurement.current.value,
      date: date.current.value,
      val: val.current.value,
      method: method.current.value
    }).then((response) => {
      val.current.value = "";
      method.current.value = "";
      alert(response.data);
    })
  };
  
  const generateWeights = weights.map((weight) => {
    return <SingleMeasurement key={weight.id} measurement={weight} />
  })

  const generateSteps = steps.map((step) => {
    return <SingleMeasurement key={step.id} measurement={step} />
  })

  const generatePulses = pulses.map((pulse) => {
    return <SingleMeasurement key={pulse.id} measurement={pulse} />
  })

  return (
    <div className="container">
      <h1>Measurements</h1>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <h2>Add measurement</h2>
        <label>Measurement</label>
        <select ref={measurement} id="options" placeholder="Select One">
          <option value="weights">Weight</option>
          <option value="pulses">Pulse</option>
          <option value="steps">Steps</option>
        </select>
        <input ref={val} type="number"></input>
        <label>Date</label>
        <input ref={date} type="date"></input>
        <label>Method</label>
        <input ref={method} type="text"></input>
        <button>Submit</button>
      </form>
      <h1>All Measurements</h1>
      <h2>Weights</h2>
      <div className={classes.measurementsGenerate}>
        {generateWeights.length === 0 ? <div>There are no measurements</div> : generateWeights}
      </div>
      <h2>Steps</h2>
      <div className={classes.measurementsGenerate}>
        {generateSteps.length === 0 ? <div>There are no measurements</div> : generateSteps}
      </div>
      <h2>Pulses</h2>
      <div className={classes.measurementsGenerate}>
        {generatePulses.length === 0 ? <div>There are no measurements</div> : generatePulses}
      </div>
      
      <div></div>
    </div>
  );
};

export default Measurements;
