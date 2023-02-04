import React from 'react';
import './App.css';

import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';

export default class App extends React.Component {
  nextId = 1;

  constructor() {
    super();
    this.state = {
      items: [],
      filter: 'all',
    };
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    });
  };

  getTime = (minutes, seconds) => +minutes * 60 + +seconds;

  addItem = (description, minutes, seconds) => {
    const timeInSec = this.getTime(minutes, seconds);
    const newItem = this.createTodoItem(description, timeInSec);

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

  onPlay = (id) => {
    this.setState(({ items }) => ({ items: this.toggleProperty(items, id, 'isTimerOn', true) }));
  };

  onPause = (id) => {
    this.setState(({ items }) => ({ items: this.toggleProperty(items, id, 'isTimerOn', false) }));
  };

  updateTime = () => {
    this.interval = setInterval(() => {
      this.setState(({ items }) => {
        const newArr = items.map((item) => {
          if (item.timeInSec === 0 || item.done) {
            return item;
          }
          if (item.isTimerOn) {
            // eslint-disable-next-line no-param-reassign
            item.timeInSec -= 1;
          }
          return item;
        });
        return {
          items: newArr,
        };
      });
    }, 1000);
  };

  toggleProperty = (arr, id, propName, value = !arr[arr.findIndex((item) => item.id === id)][propName]) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: value };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  createTodoItem(description, timeInSec) {
    return {
      description,
      timeInSec,
      isTimerOn: false,
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
        <NewTaskForm addItem={this.addItem} />

        <section className="main">
          <TaskList
            items={visibleList}
            onToggleDone={this.onToggleDone}
            deleteItem={this.deleteItem}
            onPlay={this.onPlay}
            onPause={this.onPause}
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
