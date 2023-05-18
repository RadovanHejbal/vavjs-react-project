import MainHeader from "../components/user/MainHeader";
import Measurements from "../components/user/Measurements";
import MeasurementGraphs from "../components/user/MeasurementGraphs";
import { useEffect, useState } from "react";
import Axios from "axios";
import Methods from "../components/user/Methods";

let advertising = {
  link: null,
  image: null,
};

const adDisplayAfter = 15000;

const UserInterface = () => {
  const [page, setPage] = useState("Measurements");
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    Axios.get("/get/advertising").then((response) => {
      advertising.link = response.data.link;
      advertising.image = response.data.image;
      setAdVisible(true);
    });
  }, []);

  const changePageHandler = (data) => {
    setPage(data);
  };

  const closeAdHandler = () => {
    setAdVisible(false);
    setTimeout(() => {
      setAdVisible(true);
    }, adDisplayAfter);
  };

  const adClickHandler = () => {
    Axios.post("/clicked/ad", {plus: 1});
  }

  let generatePage = <Measurements />;
  if (page === "MeasurementGraphs") generatePage = <MeasurementGraphs />;
  else if (page === "Methods") generatePage = <Methods />

  return (
    <div>
      {adVisible && (
        <a href={advertising.link} target="_blink">
          <img onClick={adClickHandler} className="advertising" src={advertising.image} alt="Ad"></img>
        </a>
      )}
      {adVisible && <button onClick={closeAdHandler} className="closeAd">Close Ad</button>}
      <MainHeader changePage={changePageHandler} />
      {generatePage}
    </div>
  );
};

export default UserInterface;
