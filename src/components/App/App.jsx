import React, { Component } from 'react';

import TodoList from "../TodoList";
import AppHeader from "../AppHeader"
import SearchPanel from '../SearchPanel/SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm'

import './App.css'

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Learn React'),
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Change JOB'),
    ],
    term: '',
    filter: 'all'//active, all, done
  }

  //Function for create todoData in state
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  //Function for AppHeader

  //1. Function for SearchPanel

  searchItem = (text) => {
    this.setState(({ todoData }) => {

      const newArray = [
        todoData.filter((item) => item.label.toLowerCase.includes(text))
      ];

      return {
        todoData: newArray
      }
    })
  };

  onSearchChange = (term) => {
    this.setState({ term })
  };

  //2. Function for ItemStatusFilter
  onFilterChange = (filter) => {
    this.setState({ filter })
  }

//Function for TodoList--> TodoListItem

//Фун-ия для переключения состояния important или done
//что бедет передано в propName
toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id);

  //1.update object
  const oldItem = arr[idx];
  const newItem = {
    ...oldItem,
    [propName]: !oldItem[propName]
  }

  //2.construct new array
  return [
    ...arr.slice(0, idx),
    newItem,
    ...arr.slice(idx + 1)
  ];
}

onToggleImportant = (id) => {
  this.setState(({ todoData }) => {
    return {
      todoData: this.toggleProperty(todoData, id, 'important')
    }
  })
}

onToggleDone = (id) => {
  this.setState(({ todoData }) => {
    return {
      todoData: this.toggleProperty(todoData, id, 'done')
    }
  })
}

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    })
  }

//Function for ItemAddForm

  addItem = (text) => {
    //generate id?
    const newItem = this.createTodoItem(text)
    //add element in Arr
    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      }
    })
  }

  //Use for const visibleItems
  //Учли текст в строке поиск далее 
  //учли нажатыую кнопку ItemStatusFilter
  //и только потом передали результат в TodoList для рендеринга
  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
//Достали с помощью деструктуризации данные из state
    const { todoData, term, filter } = this.state;

//Определили видимые елементы
    const visibleItems = this.filter(
      this.search(todoData, term), filter);

// Счетчик выполненых заданий
    const doneCount = todoData.filter((el) => el.done).length;

// Счетчик НЕ выполненых заданий
    const todoCount = todoData.length - doneCount;


// JSX код с передачей в props необходимых
//функций и данных

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};


