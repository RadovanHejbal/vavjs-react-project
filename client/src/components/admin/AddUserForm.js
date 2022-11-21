import { useRef } from "react";
import Axios from 'axios';
import classes from './AddUserForm.module.css';

const AddUserForm = (props) => {
  const login = useRef();
  const password = useRef();
  const passwordRepeat = useRef();
  const email = useRef();
  const age = useRef();
  const height = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      login.current.value.trim() === "" ||
      password.current.value.trim() === "" ||
      email.current.value.trim() === "" ||
      age.current.value.trim() === "" ||
      height.current.value.trim() === ""
    ) {
      alert("Wrong input! You need to fill everything!");
      return;
    } else if (
      password.current.value.trim() !== passwordRepeat.current.value.trim()
    ) {
      alert("Wrong input! Passwords are not matching!");
      return;
    }

    Axios.post("http://localhost:3001/api/register", {
      login: login.current.value,
      password: password.current.value,
      email: email.current.value,
      age: age.current.value,
      height: height.current.value,
    }).then((response) => {
        props.updateUsers();
    })
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <label>Username</label>
      <input ref={login} type="text" placeholder="Login" />
      <label>Email</label>
      <input ref={email} type="text" placeholder="email@email.com" />
      <label>Password</label>
      <input ref={password} type="password" placeholder="********" />
      <label>Repeat Password</label>
      <input ref={passwordRepeat} type="password" placeholder="********" />
      <label>Age</label>
      <input ref={age} type="text" placeholder="18" />
      <label>Height (cm)</label>
      <input ref={height} type="text" placeholder="180" />
      <button type="submit">Add User!</button>
    </form>
  );
};

export default AddUserForm;
