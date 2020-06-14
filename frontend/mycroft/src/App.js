import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './containers/LoginForm/LoginForm';
import RegisterForm from './containers/RegisterForm/RegisterForm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
