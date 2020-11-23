import React,{ useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AppPage from "../pages/appPage";
import {Context as QuizContext} from "../context/QuizContext";
const DashboardNavigator = () => {
  const {relog, state:{session}} = React.useContext(QuizContext);

  const handleRelog = () =>{
    const storedSession = JSON.parse(localStorage.getItem("session"));
    if(!session.isActive && storedSession){
      relog({...storedSession});
    }
  }
  useEffect(()=>{
    handleRelog();
  },[]);
  return (
    <Switch>
        {session.isActive  && <Route path="/app" component={AppPage}/>}
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/" component={Dashboard}/> {/* TODO: Replace for Page not found*/}
    </Switch>
  );
};
export default DashboardNavigator;