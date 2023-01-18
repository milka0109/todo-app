import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
    };
  }

  onLabelChange = (evt) => {
    this.setState({
      description: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    const { addItem } = this.props;
    const { description } = this.state;
    evt.preventDefault();
    addItem(description);
    this.setState({ description: '' });
  };

  render() {
    const { description } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            minLength={1}
            maxLength={20}
            value={description}
            required
          />
        </form>
      </header>
    );
  }
}
