import React from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';
import Task from '../Task';

export default class TaskList extends React.Component {
  static defaultProps = {
    items: [],
    onToggleDone: () => {},
    onToggleEditable: () => {},
    deleteItem: () => {},
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        done: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
    onToggleDone: PropTypes.func,
    onToggleEditable: PropTypes.func,
    deleteItem: PropTypes.func,
  };

  render() {
    const { items, onToggleDone, onToggleEditable, deleteItem } = this.props;

    const elements = items.map(({ id, ...itemProps }) => {
      let classNames = '';
      if (itemProps.done) classNames += 'completed';

      return (
        <li key={id} className={classNames}>
          <Task
            {...itemProps}
            onToggleDone={() => onToggleDone(id)}
            onToggleEditable={() => onToggleEditable(id)}
            deleteItem={() => deleteItem(id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
