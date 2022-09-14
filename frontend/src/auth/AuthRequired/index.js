import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRequiredRoute({ component: Component, isAuthenticated, ...rest }) {
  /* Require authentication for a passed in route.
     https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
  */
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth/wallet-begin', state: { from: props.location } }} />)}
    />
  );
}

export default AuthRequiredRoute;
