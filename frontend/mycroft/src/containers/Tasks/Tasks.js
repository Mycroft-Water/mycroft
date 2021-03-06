import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Container from 'react-bootstrap/Container';
import TaskList from './TaskList';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Aux>
        <NavigationBar />
        <Container>
          <TaskList />
        </Container>
      </Aux>
    );
  }
}

export default withRouter(Tasks);
