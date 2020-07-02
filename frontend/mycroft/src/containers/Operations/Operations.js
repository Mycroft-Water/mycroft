import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Container from 'react-bootstrap/Container';
import OperationList from './OperationList';

class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Aux>
        <NavigationBar />
        <Container>
          <OperationList />
        </Container>
      </Aux>
    );
  }
}

export default withRouter(Operations);
