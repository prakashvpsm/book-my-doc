import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
import Layout from "../components/layout/layout";


function RouterComponent() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><PrivateRoute /></Layout>}>
          {privateRoutes.map((route) => {
            return <><Route path={route.path} element={route.component} /></>
          })}
        </Route>
        {publicRoutes.map((route) => {
          return (
            <Route path={route.path} element={<PublicRoute />}>
              <Route path={`/${route.path}`} element={route.component} />
            </Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default RouterComponent;
