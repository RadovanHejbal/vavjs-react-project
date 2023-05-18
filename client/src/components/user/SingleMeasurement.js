
const SingleMeasurement = (props) => {
    const onRemoveHandler = (e) => {
        const data = {
            id: props.measurement.id,
            type: props.type
        }
        props.removeMeasurement(data);
    }

    return <div>
        <h3>{props.measurement.value}</h3>
        <p>{props.measurement.date}</p>
        <p>{props.measurement.method}</p>
        <button onClick={onRemoveHandler}>Remove Measurement</button>
    </div>
}

export default SingleMeasurement;