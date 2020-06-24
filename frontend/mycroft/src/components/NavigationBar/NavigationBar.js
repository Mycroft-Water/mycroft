import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import classes from './NavigationBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.username = localStorage.getItem('username');
  }

  logoutClickHandler = (event) => {
    localStorage.removeItem('username');
    localStorage.removeItem('auth_token');
    this.props.history.push('/login');
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Image
            src="/assets/logo.png"
            alt="Mycroft - Water"
            className={'mr-2 ' + classes.navLogo}
          />
          Mycroft
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/triggers"
              className="text-light"
              activeClassName="active"
            >
              Triggers
            </NavLink>
            <NavLink
              to="/operations"
              className="text-light ml-4"
              activeClassName="active"
            >
              Operations
            </NavLink>
            <NavLink
              to="/tasks"
              className="text-light ml-4"
              activeClassName="active"
            >
              Tasks
            </NavLink>
          </Nav>
          <Nav>
            <Navbar.Text className="mr-3">
              Sign in as <strong>{this.username}</strong>
            </Navbar.Text>
            <Button variant="info" onClick={this.logoutClickHandler}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavigationBar);
