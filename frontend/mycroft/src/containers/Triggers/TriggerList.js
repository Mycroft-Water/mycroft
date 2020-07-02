import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class TriggerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="pt-3">
        <h4>Trigger List</h4>
        <Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(TriggerList);
