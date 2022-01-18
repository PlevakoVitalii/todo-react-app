import React, { Component } from "react";

import './ItemStatusFilter.css'

export default class ItemStatusFilter extends Component {
  //Создали  массив кнопок что бы пройтись по нему с применением map
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {
//Достали данные из пропсов
    const { filter, onFilterChange } = this.props;

    //Прошлись map по масиву кнопок
    //Определили активную кнопку--ту котой name равен filter
    //Полученого из props
    //Затем актиной кнопке передаем css класс {clazz}
    
    //На onClick обрабатуем клик и вызываем onFilterChange(name)
    //передаем в нее name кнопки после чего ф-ия onFilterChange(name)
    //установит в App.jsx name в state в значение filter
    //и отобразятся только нужные елементы 
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz=isActive?'btn-info':'btn-outline-secondary'
      return (
        <button type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={()=>onFilterChange(name)}>
          {label}
        </button>
      )
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
};

