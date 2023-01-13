import React from "react";
import './TaskList.css';
import Task from "../Task";

export default class TaskList extends React.Component {

    render() {

        const { items, onToggleDone, onToggleEditable, deleteItem } = this.props;

        const elements = items.map(({id, ...itemProps}) => {
            let classNames = "";
            if (itemProps.done) classNames += "completed";
            if (itemProps.editable) classNames += "editing";

            return (
                <li key={id} className={classNames}>
                    <Task
                        {...itemProps}
                        onToggleDone={() => onToggleDone(id)}
                        onToggleEditable={() => onToggleEditable(id)}
                        deleteItem={() => deleteItem(id)} />
                </li>
            )
        })
        
        return (
            <ul className="todo-list">
                {elements}
            </ul>
        )
    }
}