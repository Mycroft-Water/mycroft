import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import taskApis from '../../apis/task-apis';
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
      new_task_triggers: [],
      new_task_name: '',
      new_task_operations: {},
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.taskDeleteClickHandler = this.taskDeleteClickHandler.bind(this);
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
    taskApis.fetchTasks().then((response) => {
      this.setState({ tasks: response.data.tasks });
    });
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const task_name = this.state.new_task_name;
    const task_triggers = this.state.new_task_triggers;
    const task_operations = this.state.new_task_operations;
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
            <Form.Label htmlFor="task_triggers">Triggers</Form.Label>
            <Form.Control
              type="text"
              id="task-triggers"
              name="new_task_triggers"
              placeholder="Task Triggers"
              required
              value={JSON.stringify(this.state.new_task_triggers)}
              onChange={this.inputChangeHandler}
            />
            <Form.Label htmlFor="task-operations">Operations</Form.Label>
            <Form.Control
              type="text"
              id="task-operations"
              name="new_task_operations"
              placeholder="Task Operations"
              required
              value={JSON.stringify(this.state.new_task_operations)}
              onChange={this.inputChangeHandler}
            />
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
