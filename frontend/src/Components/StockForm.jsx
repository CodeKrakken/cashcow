import React, { Component } from "react";

class StockForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A symbol was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Symbol (e.g. TSLA):
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="OK" />
      </form>
    );
  }
}

export default StockForm;
