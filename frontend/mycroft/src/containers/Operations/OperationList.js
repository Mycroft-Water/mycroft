import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class OperationList extends Component {
  constructor(props) {
    super(props);
    this.operationTableHeaders = ['#', 'Name', 'Type', 'Actions'];
    this.state = {
        operations: [],
    };
  }
}

export default withRouter(OperationList);
