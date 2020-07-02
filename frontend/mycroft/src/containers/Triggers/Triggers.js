import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
          <Row>
            <TriggerList />
          </Row>
        </Container>
      </Aux>
    );
  }
}

export default withRouter(Triggers);
