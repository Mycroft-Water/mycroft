import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import operationApis from '../../apis/operation-apis';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class OperationList extends Component {
  constructor(props) {
    super(props);
    this.operationTableHeaders = ['#', 'Name', 'Type', 'Actions'];
    this.state = {
      operations: [],
      new_operation_name: '',
      new_operation_type: 'Zoom',
      new_operation_zoom_link: '',
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.operationDeleteClickHandler = this.operationDeleteClickHandler.bind(
      this
    );
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  componentDidMount() {
    operationApis.fetchOperations().then((response) => {
      this.setState({
        operations: response.data.operations,
      });
    });
  }

  inputChangeHandler(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  operationDeleteClickHandler(event) {
    const operation_name =
      event.target.parentElement.parentElement.children[1].innerHTML;
    operationApis.deleteOperation(operation_name).then((response) => {
      operationApis.fetchOperations().then((response) => {
        this.setState({
          operations: response.data.operations,
        });
      });
    });
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const operation_name = this.state.new_operation_name;
    const operation_type = this.state.new_operation_type;
    const other_fields = this.getDocumentOtherFields(operation_type);
    let operation_document = {
      name: operation_name,
      type: operation_type.toLowerCase(),
      ...other_fields,
    };

    operationApis.addOperation(operation_document).then((response) => {
      operationApis.fetchOperations().then((response) => {
        this.setState({
          operations: response.data.operations,
        });
      });
    });
  }

  getFormOtherFields() {
    switch (this.state.new_operation_type) {
      case 'Zoom':
        return (
          <Aux>
            <Form.Label htmlFor="operation-zoom-link" className="pt-4">
              Link
            </Form.Label>
            <Form.Control
              type="text"
              id="operation-zoom-link"
              name="new_operation_zoom_link"
              value={this.state.new_operation_zoom_link}
              onChange={this.inputChangeHandler}
            />
          </Aux>
        );
        break;
    }
  }

  getDocumentOtherFields(operation_type) {
    switch (operation_type) {
      case 'Zoom':
        return { link: this.state.new_operation_zoom_link };
        break;
    }
  }

  render() {
    let operation_rows = this.state.operations.map((operation, index) => {
      return (
        <tr key={'operation_row_' + index}>
          <td>{index + 1}</td>
          <td>{operation.name}</td>
          <td>
            {operation.type.charAt(0).toUpperCase() + operation.type.slice(1)}
          </td>
          <td>
            <Button size="sm" onClick={this.operationDeleteClickHandler}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    let other_fields = this.getFormOtherFields();

    return (
      <div className="pt-3">
        <h4>Operation List</h4>
        <Row>
          <Table className="operation-table" striped={true}>
            <thead>
              <tr>
                {this.operationTableHeaders.map((header) => (
                  <th key={'header_' + header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{operation_rows}</tbody>
          </Table>
        </Row>
        <h4>Create a New Operation</h4>
        <Form id="create-operation-form" onSubmit={this.formSubmitHandler}>
          <Form.Group as={Row} controlId="formOperationName">
            <Form.Label htmlFor="operation-name">Name</Form.Label>
            <Form.Control
              type="text"
              id="operation-name"
              name="new_operation_name"
              placeholder="Operation Name"
              required
              value={this.state.new_operation_name}
              onChange={this.inputChangeHandler}
            />
            <Form.Label htmlFor="operation-type" className="pt-4">
              Type
            </Form.Label>
            <Form.Control
              as="select"
              id="operation-type"
              name="new_operation_type"
              defaultValue="Choose..."
              required
              value={this.state.new_operation_type}
              onChange={this.inputChangeHandler}
            >
              <option>Zoom</option>
            </Form.Control>
            {other_fields}
          </Form.Group>
          <Button type="submit" size="lg">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(OperationList);
