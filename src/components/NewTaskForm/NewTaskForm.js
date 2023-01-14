import React from "react";
import PropTypes from 'prop-types';
import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {

    static defaultProps = {
        onSubmit: () => {},
    };

    static propTypes = {
        onSubmit: PropTypes.func,
    };

    render() {

        const { onSubmit } = this.props;

        return (
            <header className="header">
                <h1>todos</h1>
                <input  type="text" 
                        className="new-todo"
                        placeholder = "What needs to be done?"
                        autoFocus = {true}
                        onKeyDown = {(evt) => onSubmit(evt)} />

            </header>
        )
    }
}