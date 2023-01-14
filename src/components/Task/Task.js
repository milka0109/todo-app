import React from "react";
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

    onCheckDone = (status) => {
        if (status) return true
        else return false;
    }

    render() {

        const { description, done, created, onToggleDone, onToggleEditable, deleteItem } = this.props;
        const thisMuchAgo = formatDistanceToNow(created, {addSuffix: true})


        return (
            <div className="view">
                <input type="checkbox" className="toggle" onClick={onToggleDone} defaultChecked={this.onCheckDone(done)} />
                <label>
                    <span className="description">{description}</span>
                    <span className="created">created {thisMuchAgo}</span>
                </label>
                <button className="icon icon-edit" onClick={onToggleEditable}></button>
                <button className="icon icon-destroy" onClick={deleteItem}></button>
            </div>
        )
    }
}
