import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import triggerApis from '../../apis/trigger-apis';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class TriggerList extends Component {
  constructor(props) {
    super(props);
    this.triggerTableHeaders = ['#', 'Name', 'Type', 'Actions'];
    this.state = {
      triggers: [],
      new_trigger_name: '',
      new_trigger_type: 'Schedule',
      new_trigger_schedule_time: '00:00',
      new_trigger_schedule_repeat: 'day',
      new_trigger_other_keys: [''],
      new_trigger_other_values: [''],
      new_trigger_custom_type: '',
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.addFieldClickHandler = this.addFieldClickHandler.bind(this);
    this.triggerDeleteClickHandler = this.triggerDeleteClickHandler.bind(this);
  }

  inputChangeHandler(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if(this.state.new_trigger_type === 'Custom') {
      const id = target.id;
      console.log("updating" + id);
      if(name === "new_trigger_key") {
        this.setState(state => {
          const new_trigger_other_keys = state.new_trigger_other_keys.map((item, index) => {
            if (index === parseInt(id, 10) - 1) {
              return value;
            } else {
              return item;
            }
          });
     
          return {
            new_trigger_other_keys,
          };
        });
      } else {
        this.setState(state => {
          const new_trigger_other_values = state.new_trigger_other_values.map((item, index) => {
            if (index === parseInt(id, 10) - 1) {
              return value;
            } else {
              return item;
            }
          });
     
          return {
            new_trigger_other_values,
          };
        });
      }
    }
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    triggerApis.fetchTriggers().then((response) => {
      this.setState({
        triggers: response.data.triggers,
      });
    });
  }

  getFormOtherFields() {
    switch (this.state.new_trigger_type) {
      case 'Schedule':
        return (
          <Aux>
            <Form.Label htmlFor="trigger-schedule-time" className="pt-4">
              Time
            </Form.Label>
            <Form.Control
              type="time"
              id="trigger-schedule-time"
              name="new_trigger_schedule_time"
              value={this.state.new_trigger_schedule_time}
              onChange={this.inputChangeHandler}
            />
            <Form.Label htmlFor="trigger-schedule-repeat" className="pt-4">
              Repeat
            </Form.Label>
            <Form.Control
              as="select"
              id="trigger-schedule-repeat"
              name="new_trigger_schedule_repeat"
              value={this.state.new_trigger_schedule_repeat}
              onChange={this.inputChangeHandler}
            >
              <option>Day</option>
              <option>Week</option>
            </Form.Control>
          </Aux>
        );
        break;
      case 'Custom':
        return (
          <Aux>
            <Form.Control
              type="text"
              id="trigger-custom-type"
              name="new_trigger_custom_type"
              value={this.state.new_trigger_custom_type}
              placeholder="Type"
              onChange={this.inputChangeHandler}
            />
            <Form.Label htmlFor="trigger-slides-path" className="pt-4" id="others-label">
              Attributes / Values
            </Form.Label>
            <div id="trigger-others-key-box">
            {this.state.new_trigger_other_keys.map((key, index) => {
              return (
                <Aux>
                  <Form.Control
                    type="text"
                    id={index + 1}
                    name="new_trigger_key"
                    value={key}
                    placeholder="Attirbute Name"
                    onChange={this.inputChangeHandler}
                  />
                </Aux>
              );
            })}
            </div>
            <div id="trigger-others-value-box">
            {this.state.new_trigger_other_values.map((value, index) => {
              return (
                <Aux>
                  <Form.Control
                    type="text"
                    id={index + 1}
                    name="new_trigger_value"
                    value={value}
                    placeholder="Value"
                    onChange={this.inputChangeHandler}
                  />
                </Aux>
              );
            })}
            </div>
            <button type="button" size="sm" onClick={this.addFieldClickHandler}>
              Add
            </button>
          </Aux>
        );
        break;
    }
    return null;
  }

  getDocumentOtherFields(trigger_type) {
    switch (trigger_type) {
      case 'Schedule':
        return {
          time: this.state.new_trigger_schedule_time,
          repeat: this.state.new_trigger_schedule_repeat.toLowerCase(),
        };
        break;
      default:
        let other_fields = {};
        for(var i = 0; i < this.state.new_trigger_other_keys.length; i++) {
          other_fields[this.state.new_trigger_other_keys[i]] = this.state.new_trigger_other_values[i];
        }
        return other_fields;
    }
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const trigger_name = this.state.new_trigger_name;
    const trigger_type = this.state.new_trigger_type === 'Custom' ? 
      this.state.new_trigger_custom_type : this.state.new_trigger_type;
    const other_fields = this.getDocumentOtherFields(trigger_type);
    let trigger_document = {
      name: trigger_name,
      type: trigger_type.toLowerCase(),
      ...other_fields,
    };
    triggerApis.addTrigger(trigger_document).then((response) => {
      triggerApis.fetchTriggers().then((response) => {
        this.setState({
          triggers: response.data.triggers,
        });
      });
    });
  }

  triggerDeleteClickHandler(event) {
    const trigger_name =
      event.target.parentElement.parentElement.children[1].innerHTML;
    triggerApis.deleteTrigger(trigger_name).then((response) => {
      triggerApis.fetchTriggers().then((response) => {
        this.setState({
          triggers: response.data.triggers,
        });
      });
    });
  }

  addFieldClickHandler(event) {
    this.setState(state => {
      const new_trigger_other_keys = state.new_trigger_other_keys.concat("");
      const new_trigger_other_values = state.new_trigger_other_values.concat("");
 
      return {
        new_trigger_other_keys,
        new_trigger_other_values,
      };
    });
  }

  render() {
    let trigger_rows = this.state.triggers.map((trigger, index) => {
      return (
        <tr key={'trigger_row_' + index}>
          <td>{index + 1}</td>
          <td>{trigger.name}</td>
          <td>
            {trigger.type.charAt(0).toUpperCase() + trigger.type.slice(1)}
          </td>
          <td>
            <Button size="sm" onClick={this.triggerDeleteClickHandler}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    let other_fields = this.getFormOtherFields();
    return (
      <div className="pt-3">
        <h4>Trigger List</h4>
        <Row>
          <Table className="trigger-table" striped={true}>
            <thead>
              <tr>
                {this.triggerTableHeaders.map((header) => (
                  <th key={'header_' + header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{trigger_rows}</tbody>
          </Table>
        </Row>
        <h4>Create a New Trigger</h4>
        <Form id="create-trigger-form" onSubmit={this.formSubmitHandler}>
          <Form.Group as={Row} controlId="formTriggerName">
            <Form.Label htmlFor="trigger-name">Name</Form.Label>
            <Form.Control
              type="text"
              id="trigger-name"
              name="new_trigger_name"
              placeholder="Trigger Name"
              required
              value={this.state.new_trigger_name}
              onChange={this.inputChangeHandler}
            />
            <Form.Label htmlFor="trigger-type" className="pt-4">
              Type
            </Form.Label>
            <Form.Control
              as="select"
              id="trigger-type"
              name="new_trigger_type"
              defaultValue="Choose..."
              required
              value={this.state.new_trigger_type}
              onChange={this.inputChangeHandler}
            >
              <option>Schedule</option>
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

export default withRouter(TriggerList);
