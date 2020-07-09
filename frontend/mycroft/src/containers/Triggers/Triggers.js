import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Container from 'react-bootstrap/Container';
import TriggerList from './TriggerList';

class Triggers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Aux>
        <NavigationBar />
        <Container>
          <TriggerList />
        </Container>
      </Aux>
    );
  }
}

export default withRouter(Triggers);
