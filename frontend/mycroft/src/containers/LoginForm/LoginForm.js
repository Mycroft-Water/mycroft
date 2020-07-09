import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { withRouter } from 'react-router-dom';
import userApis from '../../apis/user-apis';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error_message: '',
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  inputChangeHandler(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (this.state.error_message !== '') {
      this.setState({ error_message: '' });
    }
    this.setState({
      [name]: value,
    });
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (this.state.error_message !== '') {
      this.setState({ error_message: '' });
    }
    userApis
      .login(username, password)
      .then((response) => {
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('username', username);
        this.props.history.push('/triggers');
      })
      .catch((error) => {
        this.setState({
          error_message:
            error.response.data.exception || 'Invalid Username or Password',
        });
      });
  }

  render() {
    const alert_box =
      this.state.error_message === '' ? null : (
        <Alert variant="danger">{this.state.error_message}</Alert>
      );
    return (
      <div className={classes.formWrapper}>
        <Form
          id="login-form"
          className={classes.formSignin}
          onSubmit={this.formSubmitHandler}
        >
          <Image
            className="mb-4"
            alt="Mycroft - Water"
            src="/assets/logo.png"
          />
          <h1 className="h3 mb-3">Mycroft</h1>
          {alert_box}
          <Form.Label htmlFor="inputUsername" srOnly={true}>
            Username
          </Form.Label>
          <Form.Control
            type="text"
            id="inputUsername"
            name="username"
            placeholder="Username"
            required
            autoFocus
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
          <Form.Label htmlFor="inputPassword" srOnly={true}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="inputPassword"
            name="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
          <Button type="submit" block={true} size="lg">
            Sign in
          </Button>
          <Link to="/register">Create an new account</Link>
          <p className={'mt-3 mb-3 text-muted ' + classes.footer}>Team Water</p>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
