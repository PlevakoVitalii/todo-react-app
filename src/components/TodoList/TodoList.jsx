import React from 'react';
import TodoListItem from "../TodoListItem/TodoListItem";
import './TodoList.css'

//Из App.js через props передали todos={visibleItems}
//прошлись по ним map-ом и для каждого елемента из visibleItems
//вычленили отдельно id и остальные св-ва { id, ...itemProps } = item;
//id используем как ключи для каждой <li key={item.id}> </li>
//А остальные св-ва передаем как props в <TodoListItem {...itemProps}>
//Также каждому <TodoListItem > передали обрабоботчики событий :
//удаления елемента, отметки его как важного и как выполненого

const TodoList = ({ todos, onDeleted,
                    onToggleImportant,
                    onToggleDone }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={()=>onToggleImportant(id)}
          onToggleDone={()=>onToggleDone(id)}
        />
      </li>
    )
  })

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  )
}

export default TodoList;