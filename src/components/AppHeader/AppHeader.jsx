import React from 'react';
import './AppHEader.css'


//Достали  из props { toDo, done }
//что бы не писать {props.toDo} и {props.done}
const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h2>{toDo} more to do, {done} done</h2>
    </div>
  )
}

export default AppHeader;