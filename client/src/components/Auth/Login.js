import Axios from "axios";
import classes from './Form.module.css';
import { useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const login = useRef();
  const password = useRef();
  const changeLog = () => {
    props.changeAuth();
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(login.current.value.trim() === "" || password.current.value.trim() === "") {
      alert("Wrong input! You need to fill everything!");
      return;
    }
    
    Axios.post("http://localhost:3001/api/login", {
      username: login.current.value,
      password: password.current.value
    }).then((response) => {
      if (response) {
        if(response.data[0] === -1) {
          alert(response.data[1]);
        }else {
          const details = {
            id: response.data.id,
            name: response.data.username
          }
          authContext.login(details);
        }
      }
    })
  }

  const adminHandler = () => {
    authContext.adminLogin()
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className={classes.authForm}>
        <label>Username</label>
        <input ref={login} type="text" placeholder="Login" />
        <label>Password</label>
        <input ref={password} type="password" placeholder="********" />
        <button className={classes.authButton} type='submit'>Log In!</button>
        <div className={classes.switchAuth} onClick={changeLog}>Dont have an account? Sign up!</div>
        <div className={classes.admin} onClick={adminHandler}>Admin</div>
      </form>
    </div>
  );
};

export default Login;
