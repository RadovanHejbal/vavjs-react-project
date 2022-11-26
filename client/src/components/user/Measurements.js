import classes from "./Measurements.module.css";

const Measurements = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Measurements</h1>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <h2>Add measurement</h2>
        <label>Measurement</label>
        <select id="options" placeholder="Select One">
          <option value="Weight">Weight</option>
          <option value="Pulse">Pulse</option>
          <option value="Steps">Steps</option>
        </select>
        <input type="number"></input>
        <label>Date</label>
        <input type="date"></input>
        <label>Method</label>
        <input type="text"></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Measurements;
