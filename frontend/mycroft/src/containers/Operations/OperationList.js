import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import operationApis from '../../apis/operation-apis';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import './operation.css';

class OperationList extends Component {
  constructor(props) {
    super(props);
    this.operationTableHeaders = ['#', 'Name', 'Type', 'Actions'];
    this.state = {
      operations: [],
      new_operation_name: '',
      new_operation_type: 'Zoom',
      new_operation_other_keys: [""],
      new_operation_other_values: [""],
      new_operation_custom_type: '',
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.addFieldClickHandler = this.addFieldClickHandler.bind(this);
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
    if(this.state.new_operation_type === 'Custom') {
      const id = target.id;
      console.log("updating" + id);
      if(name === "new_operation_key") {
        this.setState(state => {
          const new_operation_other_keys = state.new_operation_other_keys.map((item, index) => {
            if (index === parseInt(id, 10) - 1) {
              return value;
            } else {
              return item;
            }
          });
     
          return {
            new_operation_other_keys,
          };
        });
      } else {
        this.setState(state => {
          const new_operation_other_values = state.new_operation_other_values.map((item, index) => {
            if (index === parseInt(id, 10) - 1) {
              return value;
            } else {
              return item;
            }
          });
     
          return {
            new_operation_other_values,
          };
        });
      }
    }
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
    const operation_type = this.state.new_operation_type === "Custom" ? 
      this.state.new_operation_custom_type : this.state.new_operation_type;
    let other_fields = {};
    if (operation_type === 'Zoom') {
      other_fields = { link: this.state.new_operation_zoom_link };
    } else if (operation_type === 'Open Slides') {
      other_fields = { path: this.state.new_operation_slides_path };
    } else {
      for(var i = 0; i < this.state.new_operation_other_keys.length; i++) {
        other_fields[this.state.new_operation_other_keys[i]] = this.state.new_operation_other_values[i];
      }
    }
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

  addFieldClickHandler(event) {
    this.setState(state => {
      const new_operation_other_keys = state.new_operation_other_keys.concat("");
      const new_operation_other_values = state.new_operation_other_values.concat("");
 
      return {
        new_operation_other_keys,
        new_operation_other_values,
      };
    });
  }

  getOtherFields() {
    if (this.state.new_operation_type === 'Zoom') {
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
    } else if (this.state.new_operation_type === 'Open Slides') {
      return (
        <Aux>
          <Form.Label htmlFor="operation-slides-path" className="pt-4">
            Path to file
          </Form.Label>
          <Form.Control
            type="text"
            id="operation-slides-path"
            name="new_operation_slides_path"
            value={this.state.new_operation_slides_path}
            onChange={this.inputChangeHandler}
          />
        </Aux>
      );
    } else if (this.state.new_operation_type === 'Custom') {
      return (
        <Aux>
          <Form.Control
            type="text"
            id="operation-custom-type"
            name="new_operation_custom_type"
            value={this.state.new_operation_custom_type}
            placeholder="Type"
            className="mt-2"
            onChange={this.inputChangeHandler}
          />
          <Form.Label htmlFor="operation-slides-path" className="pt-4" id="others-label">
            Attributes / Values
          </Form.Label>
          <div id="operation-others-key-box">
          {this.state.new_operation_other_keys.map((key, index) => {
            return (
              <Aux>
                <Form.Control
                  type="text"
                  id={index + 1}
                  name="new_operation_key"
                  value={key}
                  className="mt-2"
                  placeholder="Attribute Name"
                  onChange={this.inputChangeHandler}
                />
              </Aux>
            );
          })}
          </div>
          <div id="operation-others-value-box">
          {this.state.new_operation_other_values.map((value, index) => {
            return (
              <Aux>
                <Form.Control
                  type="text"
                  id={index + 1}
                  name="new_operation_value"
                  value={value}
                  className="mt-2"
                  placeholder="Value"
                  onChange={this.inputChangeHandler}
                />
              </Aux>
            );
          })}
          </div>
          <button type="button" className="btn btn-primary btn-sm mt-2" onClick={this.addFieldClickHandler}>
            Add
          </button>
        </Aux>
      );
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

    let other_fields = this.getOtherFields();

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
              <option>Open Slides</option>
              <option>Custom</option>
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
