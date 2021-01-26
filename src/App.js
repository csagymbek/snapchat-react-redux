import React, { useEffect } from "react";
import "./styles/App.css";
import WebcamCapture from "./components/WebcamCapture";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import View from "./components/View";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            id: authUser.uid,
            profilePic: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://1000logos.net/wp-content/uploads/2017/08/Snapchat-logo.png"
              alt=""
              className="app__logo"
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route path="/chats/view">
                    <View />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
