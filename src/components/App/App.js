import React from 'react';
import './App.css';

import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';

export default class App extends React.Component {
  static toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  nextId = 1;

  constructor() {
    super();
    this.state = {
      items: [],
      filter: 'all',
    };
  }

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = App.toggleProperty(state.items, id, 'done');
      return { items };
    });
  };

  onToggleEditable = (id) => {
    this.setState((state) => {
      const items = App.toggleProperty(state.items, id, 'editable');
      return { items };
    });
  };

  addItem = (description) => {
    const newItem = this.createTodoItem(description);

    this.setState(({ items }) => {
      const newArr = [...items, newItem];
      return {
        items: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((item) => item.id === id);
      const newArr = [...items.slice(0, idx), ...items.slice(idx + 1)];
      return {
        items: newArr,
      };
    });
  };

  onSubmit = (evt) => {
    if (evt.keyCode === 13 && evt.target.value !== '') {
      this.addItem(evt.target.value);
      // eslint-disable-next-line no-param-reassign
      evt.target.value = '';
    }
  };

  onToggleVisible = (selector) => {
    this.setState(() => ({ filter: selector }));
  };

  onToggleSelect = (btn) => {
    this.setState(() => ({ filter: btn }));
    this.onToggleVisible(btn);
  };

  showList = (visibility) => {
    const { items } = this.state;
    switch (visibility) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      default:
        return items.filter((item) => item.done);
    }
  };

  clearCompleted = () => {
    this.setState(({ items }) => {
      const newArr = items.filter((item) => !item.done);
      return {
        items: newArr,
      };
    });
  };

  createTodoItem(description) {
    return {
      description,
      created: Date.now(),
      done: false,
      editable: false,
      id: `item${this.nextId++}`,
    };
  }

  render() {
    const { items, filter } = this.state;
    const doneCount = items.filter((item) => item.done).length;
    const activeCount = items.length - doneCount;
    const visibleList = this.showList(filter);

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} onSubmit={this.onSubmit} />

        <section className="main">
          <TaskList
            items={visibleList}
            onToggleDone={this.onToggleDone}
            onToggleEditable={this.onToggleEditable}
            deleteItem={this.deleteItem}
            onSubmit={this.onSubmit}
          />

          <Footer
            activeCount={activeCount}
            filter={filter}
            onToggleVisible={this.onToggleVisible}
            onToggleSelect={this.onToggleSelect}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
