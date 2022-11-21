import { useState } from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/Sign";
import classes from "./Auth.module.css";

const Auth = () => {
  const [isLogging, setIsLogging] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const changeAuthHandler = () => {
    setIsLogging((previous) => {
      return !previous;
    });
    setSignUpSuccess(false);
  };

  const signUpHandler = () => {
    setIsLogging((previous) => {
      return !previous;
    });
    setSignUpSuccess(true);
    setTimeout(() => {
      setSignUpSuccess(false);
    }, 3000);
  };

  return (
    <div className={classes.authPage}>
      {isLogging ? (
        <Login changeAuth={changeAuthHandler} />
      ) : (
        <SignUp signUp={signUpHandler} changeAuth={changeAuthHandler} />
      )}
      {signUpSuccess && (
        <div className={classes.signUpSucces}>
          Congratulations! Successfully signed up!
        </div>
      )}
    </div>
  );
};

export default Auth;
