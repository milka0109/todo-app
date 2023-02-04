import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    };
  }

  onLabelChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  onSubmit = (evt) => {
    const { addItem } = this.props;
    const { description, seconds, minutes } = this.state;
    evt.preventDefault();
    addItem(description, minutes, seconds);
    this.setState({
      description: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { description, minutes, seconds } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <button type="submit" aria-label="submission" />
          <input
            type="text"
            className="new-todo"
            name="description"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            minLength={1}
            maxLength={20}
            value={description}
            required
          />
          <input
            type="text"
            className="new-todo-form__timer"
            name="minutes"
            value={minutes}
            placeholder="Min"
            onChange={this.onLabelChange}
            pattern="[0-9]*"
            required
          />
          <input
            type="text"
            className="new-todo-form__timer"
            name="seconds"
            value={seconds}
            placeholder="Sec"
            onChange={this.onLabelChange}
            pattern="[0-6]{1}[0-9]*"
            required
          />
        </form>
      </header>
    );
  }
}
