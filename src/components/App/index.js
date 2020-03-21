import React, { useState, useEffect } from "react";
import "./styles.css";
import HomePage from "../HomePage";
import Login from "../Login";
import Register from "../Register";
import schedule from "../Schedule";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../firebase";
import AuthenticatedRoute from "../AuthenticatedRoute";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

const theme = createMuiTheme();

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthenticatedRoute
            path="/schedule"
            component={schedule}
          ></AuthenticatedRoute>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
