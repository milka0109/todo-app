import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends React.Component {
  static defaultProps = {
    description: '',
    created: Date.now(),
    done: false,
    onToggleDone: () => {},
    onToggleEditable: () => {},
    deleteItem: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.number,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onToggleEditable: PropTypes.func,
    deleteItem: PropTypes.func,
  };

  constructor() {
    super();
    this.onCheckDone = (status) => {
      if (status) return true;
      return false;
    };
  }

  render() {
    const { description, done, created, onToggleDone, onToggleEditable, deleteItem } = this.props;
    const thisMuchAgo = formatDistanceToNow(created, { addSuffix: true });

    return (
      <div className="view">
        <input type="checkbox" className="toggle" onClick={onToggleDone} defaultChecked={this.onCheckDone(done)} />
        <label>
          <span className="description">{description}</span>
          <span className="created">created {thisMuchAgo}</span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={onToggleEditable} />
        <button type="button" aria-label="Delete" className="icon icon-destroy" onClick={deleteItem} />
      </div>
    );
  }
}
