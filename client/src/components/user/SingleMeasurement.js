
const SingleMeasurement = (props) => {
    const onClickHandler = (e) => {
        
    }

    return <div>
        <h3>{props.measurement.value}</h3>
        <p>{props.measurement.date}</p>
        <p>{props.measurement.method}</p>
        <button onClick={onClickHandler}>Remove Measurement</button>
    </div>
}

export default SingleMeasurement;