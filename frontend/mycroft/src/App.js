import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './containers/LoginForm/LoginForm';
import RegisterForm from './containers/RegisterForm/RegisterForm';
import Tasks from './containers/Tasks/Tasks';
import Triggers from './containers/Triggers/Triggers';
import Operations from './containers/Operations/Operations';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <LoginForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/triggers">
          <Triggers />
        </Route>
        <Route path="/operations">
          <Operations />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
