import {
  Route,
  BrowserRouter,
  RouteComponentProps,
  Redirect,
  Switch,
} from 'react-router-dom';

import React from 'react';
import Login from '../pages/Login';
import { isAuthenticated } from '../services/auth';

interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ component: Component, path, exact = false }: Props) => (
  <Route
    exact={exact}
    path={path}
    render={(props: RouteComponentProps) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <PrivateRoute component={() => <h1>SignUp</h1>} path="/menu" />
        <Route path="*" component={() => <h1>Page not found</h1>} />
        {/* <Route component={SearchPoint} path="/search-point" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
