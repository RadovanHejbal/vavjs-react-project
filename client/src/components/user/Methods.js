import Axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Measurements.module.css";

const Methods = () => {
  const [methods, setMethods] = useState([]);
  const newMethod = useRef();
  const newMethodDesc = useRef();
  const authContext = useContext(AuthContext);
  const userId = authContext.id;

  useEffect(() => {
    Axios.post("/get/methods", { userId }).then((response) => {
      setMethods(response.data);
    });
  }, [userId]);

  const onAddMethodHandler = (e) => {
    e.preventDefault();
    Axios.post("/add/method", {
      method: newMethod.current.value,
      description: newMethodDesc.current.value,
      userId: userId,
    }).then((response) => {
        Axios.post("/get/methods", { userId }).then((response) => {
            setMethods(response.data);
          });
    });
  };

  const onRemoveMethod = (data) => {
    Axios.post("/remove/method", {id: data}).then((res) => {
        if(res.data === "success") {
            setMethods((previous) => {
                return previous.filter(el => el.id !== data);
            })
        }
    });
  }

  const generateOptions = methods.map(option => {
    return <div>
        <h2>{option.title}</h2>
        <div>{option.description}</div>
        <button onClick={() => onRemoveMethod(option.id)}>Remove method</button>
    </div>
  })

  return (
    <div>
      <form onSubmit={onAddMethodHandler} className={classes.form}>
        <h2>Add Method</h2>
        <label>Method</label>
        <input ref={newMethod} type="text"></input>
        <label>Description</label>
        <input ref={newMethodDesc} type="text"></input>
        <button>Add</button>
      </form>
      <div className="methods">
        {generateOptions}
      </div>
    </div>
  );
};

export default Methods;
