import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './containers/LoginForm/LoginForm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
