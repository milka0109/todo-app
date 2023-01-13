import React from "react";
import TasksFilter from "../TasksFilter";
import './Footer.css';

export default class Footer extends React.Component {

    render() {

        const { activeCount, filter, onToggleVisible, onToggleSelect } = this.props;

        return (
            <footer className = "footer">
                <span className="todo-count">{activeCount} items left</span>
                <TasksFilter filter = {filter}
                        onToggleVisible = {onToggleVisible}
                        onToggleSelect = {onToggleSelect} />
                <button className = "clear-completed">Clear completed</button>
            </footer>
        )
    }
}