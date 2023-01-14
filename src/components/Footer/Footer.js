import React from "react";
import PropTypes from 'prop-types';
import TasksFilter from "../TasksFilter";
import './Footer.css';

export default class Footer extends React.Component {

    static defaultProps = {
        activeCount: 0,
        onToggleVisible: () => {},
        clearCompleted: () => {},
        onToggleSelect: () => {},
        filter: 'all',
    };

    static propTypes = {
        activeCount: PropTypes.number,
        onToggleVisible: PropTypes.func,
        clearCompleted: PropTypes.func,
    };

    render() {

        const { activeCount, filter, onToggleVisible, onToggleSelect, clearCompleted } = this.props;

        return (
            <footer className = "footer">
                <span className="todo-count">{activeCount} items left</span>
                <TasksFilter filter = {filter}
                        onToggleVisible = {onToggleVisible}
                        onToggleSelect = {onToggleSelect} />
                <button className = "clear-completed"
                        onClick={clearCompleted} >Clear completed</button>
            </footer>
        )
    }
}