import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onToggleSelect: () => {},
    filter: 'all',
  };

  static propTypes = {
    onToggleSelect: PropTypes.func,
    filter: PropTypes.string,
  };

  render() {
    const { onToggleSelect, filter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => onToggleSelect('all')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => onToggleSelect('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => onToggleSelect('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
