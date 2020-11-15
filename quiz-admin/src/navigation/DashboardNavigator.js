import React from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const DashboardNavigator = () => {
  return (
    <Switch>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/" component={Dashboard}/> {/* TODO: Replace for Page not found*/}
    </Switch>
  );
};
export default DashboardNavigator;