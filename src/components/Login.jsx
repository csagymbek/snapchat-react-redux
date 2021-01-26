import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import { auth, provider } from "../firebase";
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/08/Snapchat-logo.png"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
