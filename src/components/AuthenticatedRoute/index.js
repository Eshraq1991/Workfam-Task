import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "../firebase";

export default function AuthenticatedRoute({
  component: C,

  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        firebase.isAuthenticated() ? (
          <C {...props} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
