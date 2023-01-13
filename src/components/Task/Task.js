import React from "react";
import './Task.css';

export default class Task extends React.Component {

    onCheckDone = (status) => {
        if (status) return true
        else return false;
    }

    render() {

        const { description, done, created, onToggleDone, onToggleEditable, deleteItem } = this.props;

        return (
            <div className="view">
                <input type="checkbox" className="toggle" onClick={onToggleDone} defaultChecked={this.onCheckDone(done)} />
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{`created ${created}`}</span>
                </label>
                <button className="icon icon-edit" onClick={onToggleEditable}></button>
                <button className="icon icon-destroy" onClick={deleteItem}></button>
            </div>
        )
    }
}
