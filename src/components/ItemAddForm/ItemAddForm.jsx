import React, { Component } from "react";

import './ItemAddForm.css';

export default class ItemAddForm extends Component {
//Создали класовый а не функциональный компонент для 
// добавления своего state
  state = {
    label: ''
  }


  //Извлекли label из поля формы добавления
  // нового задания, преобразовав в верхний шрифт
  //и устангвили его в state
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value.toUpperCase()
    })
  }


  //e.preventDefault() отмена дефолтной перезагрузки страницы
  //Вызвали принятую из пропсов props.onItemAdded
  // и передали ей (this.state.label)
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: ''
    })
  }

  //форма содержит input  и button
  //отправка формы будет или по нажатию на кнопку
  //или по нажатию на Enter

  //Что бы input был управляемым елементом т.е. содержимое бралось из state
  //А не вводилось пользователем рассогласовано с state
  //для этого  value={this.state.label} в input взяли из state

  //И теперь мы на onChange={this.onLabelChange} - изменяем state 
  //И только потом берем значения для отрисоки в input
  render() {
    return (
      <form className="d-flex item-add-form"
        onSubmit={this.onSubmit}>        
        <input type="text"
          className="form-control"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary">
          Add item
        </button>
      </form>
    );
  }
};

