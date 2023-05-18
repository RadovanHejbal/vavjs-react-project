import Axios from "axios";
import { useEffect, useState, useRef } from "react";

const AdminEntertainment = () => {
    const linkInput = useRef();
    const imageInput = useRef();
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    Axios.get("/get/advertising").then((response) => {
        setImg(response.data.image);
        setLink(response.data.link);
        setCounter(response.data.count);
    });
  }, []);

  const setNewLinkHandler = () => {
    Axios.post("/new-link", {
        link: linkInput.current.value
    }).then((response) => {
        if(response.data === "success") {
            setImg(linkInput.current.value);
        }
    })
  }

  const setNewImageHandler = () => {
    Axios.post("/set/image", {
        image: imageInput.current.value
    }).then((response) => {
        if(response.data === "success") {
            setImg(imageInput.current.value);
        }
    })
  }

  return (
    <div className="container">
      <a href={link}>
        <img src={img} />
      </a>
      <input ref={linkInput} type="text"></input>
      <button onClick={setNewLinkHandler}>Set New Link</button>
      <input ref={imageInput} type="text"></input>
      <button onClick={setNewImageHandler}>Set New Image</button>
      <div>How many times users clicked: {counter}</div>
    </div>
  );
};

export default AdminEntertainment;
