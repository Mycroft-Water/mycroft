import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

class Triggers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Aux>
        <NavigationBar />
      </Aux>
    );
  }
}

export default withRouter(Triggers);
