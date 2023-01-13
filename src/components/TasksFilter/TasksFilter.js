import React from "react";
import './TasksFilter.css';

export default class TasksFilter extends React.Component {

    render() {

        const { onToggleSelect, filter } = this.props;

        return (
            <ul className="filters">
                <li>
                    <button className={(filter === "all") ? "selected" : ""}
                            onClick={() => onToggleSelect("all")}>All</button>
                </li>
                <li>
                    <button className={(filter === "active") ? "selected" : ""}
                            onClick={() => onToggleSelect("active")}>Active</button>
                </li>
                <li>
                    <button className={(filter === "completed") ? "selected" : ""}
                            onClick={() => onToggleSelect("completed")}>Completed</button>
                </li>
            </ul>
        )
    }
}