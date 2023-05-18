import classes from "./Measurements.module.css";
import Axios from 'axios';
import { useRef, useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import SingleMeasurement from './SingleMeasurement';
import MethodOption from "./MethodOption";

const Measurements = () => {
  const [weights, setWeights] = useState([]);
  const [steps, setSteps] = useState([]);
  const [pulses, setPulses] = useState([]);
  const [methods, setMethods] = useState([]);

  const authContext = useContext(AuthContext);
  const userId = authContext.id;

  const measurement = useRef();
  const date = useRef();
  const val = useRef();
  const method = useRef();

  useEffect(() => {
    Axios.post("/get/measurements", {id: userId, measurement: "weights"}).then( (res) => {
      setWeights(res.data);
    })
    Axios.post("/get/measurements", {id: userId, measurement: "steps"}).then( (res) => {
      setSteps(res.data);
    })
    Axios.post("/get/measurements", {id: userId, measurement: "pulses"}).then( (res) => {
      setPulses(res.data);
    })

    Axios.post("/get/methods", {userId}).then(response => {
      setMethods(response.data);
    })
  
  }, [userId])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(measurement.current.value.trim() === "" || date.current.value.trim() === "" || val.current.value.trim() === "") {
      alert("You need to fill everything!")
      return;
    }

    console.log(method.current.value)

    Axios.post("/insert/measurment", {
      userId: authContext.id,
      measurment: measurement.current.value,
      date: date.current.value,
      val: val.current.value,
      method: method.current.value
    }).then((response) => {
      val.current.value = "";
      alert("Successfuly Added!- relog needed");
    })
  };

  const removeMeasurementHandler = (data) => {
    Axios.post("/remove/measurement", {
      id: data.id,
      measurement: data.type
    }).then((response) => {
      if (data.type === "weights") {
        setWeights((previous) => {
          return previous.filter(weight => weight.id !== data.id);
        });
      }else if(data.type === "steps") {
        setSteps(previous => {
          return previous.filter(step => step.id !== data.id);
        });
      }else {
        setPulses(previous => {
          return previous.filter(pulse => pulse.id !== data.id);
        })
      }
    })
  }
  
  const generateWeights = weights.map((weight) => {
    return <SingleMeasurement key={weight.id} type="weights" measurement={weight} removeMeasurement={removeMeasurementHandler} />
  })

  const generateSteps = steps.map((step) => {
    return <SingleMeasurement key={step.id} type="steps" measurement={step} removeMeasurement={removeMeasurementHandler} />
  })

  const generatePulses = pulses.map((pulse) => {
    return <SingleMeasurement key={pulse.id} type="pulses" measurement={pulse} removeMeasurement={removeMeasurementHandler} />
  })

  const generateOptions = methods.map(option => {
    return <MethodOption key={option.id} method={option.title}  />
  })


  return (
    <div className="container">
      <h1>Measurements</h1>
      <div className={classes.formWrapper}>
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
          <select ref={method} id="methodOptions" placeholder="Optional select" >
            <option value="noMethod">No method</option>
            {generateOptions}
          </select>
          <button>Submit</button>
        </form>
      </div>
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
    </div>
  );
};

export default Measurements;
