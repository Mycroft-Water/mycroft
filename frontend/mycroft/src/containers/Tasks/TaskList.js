import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import taskApis from '../../apis/task-apis';
import triggerApis from '../../apis/trigger-apis';
import operationApis from '../../apis/operation-apis';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.taskTableHeaders = ['#', 'Name', 'Actions'];
    this.state = {
      tasks: [],
      triggers: [],
      operations: [],
      new_task_name: '',
      new_task_triggers: [],
      new_task_operations: { id: 'root', operation: null, sub_operations: [] },
      new_task_triggers_str: '[]',
      new_task_operations_str: '{}',
      new_task_new_trigger: '',
      new_task_new_operation: '',
      new_task_new_operation_parent: '',
      new_operation_id: 1,
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.taskDeleteClickHandler = this.taskDeleteClickHandler.bind(this);
    this.addTriggerClickHandler = this.addTriggerClickHandler.bind(this);
    this.addOperationClickHandler = this.addOperationClickHandler.bind(this);
  }

  inputChangeHandler(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.setState({
      new_task_operation_map: { root: this.state.new_task_operations },
      new_task_operations_str: JSON.stringify(
        this.state.new_task_operations,
        null,
        4
      ),
    });
    taskApis.fetchTasks().then((response) => {
      this.setState({ tasks: response.data.tasks });
    });
    triggerApis.fetchTriggers().then((response) => {
      this.setState({ triggers: response.data.triggers });
    });
    operationApis.fetchOperations().then((response) => {
      this.setState({ operations: response.data.operations });
    });
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const task_name = this.state.new_task_name;
    const task_triggers = this.state.new_task_triggers;
    const task_operations = JSON.parse(this.state.new_task_operations_str);
    let task_document = {
      name: task_name,
      triggers: task_triggers,
      operations: task_operations,
    };
    taskApis.addTask(task_document).then((response) => {
      taskApis.fetchTasks().then((response) => {
        this.setState({ tasks: response.data.tasks });
      });
    });
  }

  taskDeleteClickHandler(event) {
    const task_name =
      event.target.parentElement.parentElement.children[1].innerHTML;
    taskApis.deleteTask(task_name).then((response) => {
      taskApis.fetchTasks().then((response) => {
        this.setState({ tasks: response.data.tasks });
      });
    });
  }

  addTriggerClickHandler(event) {
    const trigger_name = event.target.parentElement.children[2].value;
    if (trigger_name !== '') {
      this.setState({
        new_task_triggers: [...this.state.new_task_triggers, trigger_name],
      });
    }
  }

  findOperation(tree, op_id) {
    if (tree['id'] === op_id) {
      return tree;
    } else {
      for (let i = 0; i < tree['sub_operations'].length; i++) {
        let sub_res = this.findOperation(tree['sub_operations'][i], op_id);
        if (sub_res !== null) {
          return sub_res;
        }
      }
    }
    return null;
  }

  addOperationClickHandler(event) {
    const new_operation_name = event.target.parentElement.children[2].value;
    const new_operation_parent = event.target.parentElement.children[3].value;
    if (new_operation_name === '' || new_operation_parent === '') return;
    const new_operation_id = String(this.state.new_operation_id);
    let new_operation = {
      id: new_operation_id,
      name: new_operation_name,
      sub_operations: [],
    };
    let new_task_operation_map = JSON.parse(
      JSON.stringify(this.state.new_task_operation_map)
    );
    new_task_operation_map[new_operation_id] = new_operation;
    let new_task_operations = JSON.parse(
      JSON.stringify(this.state.new_task_operations)
    );
    let parent_node = this.findOperation(
      new_task_operations,
      new_operation_parent
    );
    parent_node['sub_operations'].push(new_operation);
    this.setState({
      new_task_operation_map: new_task_operation_map,
      new_task_operations: new_task_operations,
      new_operation_id: this.state.new_operation_id + 1,
      new_task_operations_str: JSON.stringify(new_task_operations, null, 4),
    });
  }

  render() {
    let task_rows = this.state.tasks.map((task, index) => {
      return (
        <tr key={'task_row_' + index}>
          <td>{index + 1}</td>
          <td>{task.name}</td>
          <td>
            <Button size="sm" onClick={this.taskDeleteClickHandler}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    let trigger_options = this.state.triggers.map((trigger, index) => {
      return (
        <option value={trigger.name} key={'trigger_option_' + index}>
          {trigger.name}
        </option>
      );
    });

    let operation_options = this.state.operations.map((operation, index) => {
      return (
        <option value={operation.name} key={'operation_option_' + index}>
          {operation.name}
        </option>
      );
    });

    let operation_parent_options = [];
    if (this.state.new_task_operation_map) {
      for (let op_key in this.state.new_task_operation_map) {
        operation_parent_options.push(
          <option value={op_key} key={'parent_' + op_key}>
            {op_key}
          </option>
        );
      }
    }

    return (
      <div className="pt-3">
        <h4>Task List</h4>
        <Row>
          <Table className="task-table" striped={true}>
            <thead>
              <tr>
                {this.taskTableHeaders.map((header) => (
                  <th key={'header_' + header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{task_rows}</tbody>
          </Table>
        </Row>
        <h4>Create a New Task</h4>
        <Form id="create-task-form" onSubmit={this.formSubmitHandler}>
          <Form.Group as={Row} controlId="formTaskName">
            <Form.Label htmlFor="task-name">Name</Form.Label>
            <Form.Control
              type="text"
              id="task-name"
              name="new_task_name"
              placeholder="Task Name"
              required
              value={this.state.new_task_name}
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Row} controlId="formTaskTriggers">
            <Form.Label htmlFor="task_triggers">Triggers</Form.Label>
            <Form.Control
              type="text"
              id="task-triggers"
              name="new_task_triggers_str"
              placeholder="Task Triggers"
              required
              readOnly
              value={JSON.stringify(this.state.new_task_triggers)}
            />
            <Form.Control
              as="select"
              id="new-task-new_trigger"
              name="new_task_new_trigger"
              value={this.state.new_task_new_trigger}
              className="mt-3"
              onChange={this.inputChangeHandler}
            >
              <option value=""> Choose a new trigger......</option>
              {trigger_options}
            </Form.Control>
            <Button
              type="button"
              size="sm"
              className="mt-3"
              onClick={this.addTriggerClickHandler}
            >
              Add a new trigger
            </Button>
          </Form.Group>
          <Form.Group as={Row} controlId="formTaskOperations">
            <Form.Label htmlFor="task-operations">Operations</Form.Label>
            <Form.Control
              as="textarea"
              rows="12"
              id="task-operations"
              name="new_task_operations_str"
              placeholder="Task Operations"
              required
              value={this.state.new_task_operations_str}
              onChange={this.inputChangeHandler}
              readOnly
            />
            <Form.Control
              as="select"
              id="new-task-new-operation"
              name="new_task_new_operation"
              value={this.state.new_task_new_operation}
              className="mt-3"
              onChange={this.inputChangeHandler}
            >
              <option value=""> Choose a new operation......</option>
              {operation_options}
            </Form.Control>
            <Form.Control
              as="select"
              id="new-task-new_operation-parent"
              name="new_task_new_operation_parent"
              value={this.state.new_task_new_operation_parent}
              className="mt-3"
              onChange={this.inputChangeHandler}
            >
              <option value=""> Choose the new operation's parent......</option>
              {operation_parent_options}
            </Form.Control>
            <Button
              type="button"
              size="sm"
              className="mt-3"
              onClick={this.addOperationClickHandler}
            >
              Add a new operation
            </Button>
          </Form.Group>
          <Button type="submit" size="lg">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(TaskList);
