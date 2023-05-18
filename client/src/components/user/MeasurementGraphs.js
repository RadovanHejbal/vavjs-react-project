import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import MethodOption from "./MethodOption";
import Axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const MeasurementGraphs = () => {
  const [weights, setWeights] = useState([]);
  const [steps, setSteps] = useState([]);
  const [pulses, setPulses] = useState([]);
  const [methods, setMethods] = useState([]);
  const [filter, setFilter] = useState("noMethod");
  const selectedMethod = useRef();

  const authContext = useContext(AuthContext);
  const myId = authContext.id;

  function linearRegression(array) {
    let valuesOfDates = array.map((el) => {
      var dateParts = el.date.slice(0, 10).split("-");
      return new Date(
        parseInt(dateParts[0], 10),
        parseInt(dateParts[1], 10),
        parseInt(dateParts[2], 10)
      );
    });

    valuesOfDates = valuesOfDates.map((el) => {
      return ((valuesOfDates[0] - el) * -1) / 100000 / 6 / 24;
    });

    let XY = 0;
    let X2 = 0;
    let Y = 0;
    let X = 0;

    for (let i = 0; i < array.length; i++) {
      XY += array[i].value * valuesOfDates[i];
      X2 += array[i].value * array[i].value;
      X += valuesOfDates[i];
      Y += array[i].value;
    }

    const b = (array.length * XY - X * Y) / (array.length * X2 - X * X);
    const a = (Y - b * X) / array.length;

    let firstLastValues = valuesOfDates.map((el) => {
      return a + b * el;
    });

    return [firstLastValues[0], firstLastValues[array.length - 1]];
  }

  let weightsDataset = {
    labels: [],
    datasets: [
      {
        label: "Weights",
        data: [],
        backgroundColor: "red",
      },
    ],
  };

  let pulsesDataset = {
    labels: [],
    datasets: [
      {
        label: "Pulses",
        data: [],
        backgroundColor: "yellow",
      },
    ],
  };

  let stepsDataset = {
    labels: [],
    datasets: [
      {
        label: "Steps",
        data: [],
        backgroundColor: "green",
      },
    ],
  };

  useEffect(() => {
    Axios.post("/get/measurements", {
      measurement: "weights",
      id: myId,
    }).then((response) => {
      setWeights(response.data);
    });

    Axios.post("/get/measurements", {
      measurement: "steps",
      id: myId,
    }).then((response) => {
      setSteps(response.data);
    });

    Axios.post("/get/measurements", {
      measurement: "pulses",
      id: myId,
    }).then((response) => {
      setPulses(response.data);
    });

    Axios.post("/get/methods", { userId: myId }).then(
      (response) => {
        setMethods(response.data);
      }
    );
  }, [myId]);

  const onFilterHandler = (e) => {
    e.preventDefault();

    setFilter(selectedMethod.current.value);
  };

  let filteredWeights = [...weights];
  let filteredPulses = [...pulses];
  let filteredSteps = [...steps];

  if (filter !== "noMethod") {
    filteredWeights = filteredWeights.filter((weight) => {
      return weight.method === filter;
    });
    filteredPulses = filteredPulses.filter((weight) => {
      return weight.method === filter;
    });
    filteredSteps = filteredSteps.filter((weight) => {
      return weight.method === filter;
    });
  }

  filteredWeights = filteredWeights.sort(function (a, b) {
    var parseDate = function parseDate(dateAsString) {
      var dateParts = dateAsString.split("-");
      return new Date(
        parseInt(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10)),
        parseInt(dateParts[2], 10)
      );
    };

    return parseDate(a.date.slice(0, 10)) - parseDate(b.date.slice(0, 10));
  });

  filteredPulses = filteredPulses.sort(function (a, b) {
    var parseDate = function parseDate(dateAsString) {
      var dateParts = dateAsString.split("-");
      return new Date(
        parseInt(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10)),
        parseInt(dateParts[2], 10)
      );
    };

    return parseDate(a.date.slice(0, 10)) - parseDate(b.date.slice(0, 10));
  });

  filteredSteps = filteredSteps.sort(function (a, b) {
    var parseDate = function parseDate(dateAsString) {
      var dateParts = dateAsString.split("-");
      return new Date(
        parseInt(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10)),
        parseInt(dateParts[2], 10)
      );
    };

    return parseDate(a.date.slice(0, 10)) - parseDate(b.date.slice(0, 10));
  });

  if (filteredWeights.length > 1) {
    weightsDataset.labels = [
      filteredWeights[0].date,
      filteredWeights[filteredWeights.length - 1].date,
    ];
    weightsDataset.datasets[0].data = linearRegression(filteredWeights);
  }

  if (filteredPulses.length > 1) {
    pulsesDataset.labels = [
      filteredPulses[0].date,
      filteredPulses[filteredPulses.length - 1].date,
    ];
    pulsesDataset.datasets[0].data = linearRegression(filteredPulses);
  }

  if (filteredSteps.length > 1) {
    stepsDataset.labels = [
      filteredSteps[0].date,
      filteredSteps[filteredSteps.length - 1].date,
    ];
    stepsDataset.datasets[0].data = linearRegression(filteredSteps);
  }

  const generateOptions = methods.map((option) => {
    return <MethodOption key={option.id} method={option.title} />;
  });

  return (
    <div className="container">
      <h1>MeasurementGraphs</h1>
      <form onSubmit={onFilterHandler}>
        <label>Filter by method</label>
        <select ref={selectedMethod}>
          <option value="noMethod">No method</option>
          {generateOptions}
        </select>
        <button>Filter</button>
      </form>
      <h2>Weight</h2>
      <div className="graph">
        {filteredWeights.length > 1 ? (
          <Line className="graph" data={weightsDataset}>
            Hello
          </Line>
        ) : (
          <div>Not enough of measuremenets</div>
        )}
      </div>
      <h2>Steps</h2>
      <div className="graph">
        {filteredSteps.length > 1 ? (
          <Line className="graph" data={stepsDataset}>
            Hello
          </Line>
        ) : (
          <div>Not enough of measuremenets</div>
        )}
      </div>
      <h2>Pulse</h2>
      <div className="graph">
        {filteredPulses.length > 1 ? (
          <Line className="graph" data={pulsesDataset}>
            Hello
          </Line>
        ) : (
          <div>Not enough of measuremenets</div>
        )}
      </div>
    </div>
  );
};

export default MeasurementGraphs;
