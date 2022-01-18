import React, { Component } from "react";

import './ItemAddForm.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }


  onLabelChange = (e) => {
    this.setState({
      label: e.target.value.toUpperCase()
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label)
    this.setState({
      label: ''
    })
  }

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

