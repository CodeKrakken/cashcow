import React, { Component } from "react";

class StockForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {localSymbol: "TSLA"}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({localSymbol: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSymbolChange(this.state.localSymbol);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Symbol (e.g. TSLA):
          <input type="text" value={this.state.localSymbol} onChange={this.handleChange} />
        </label>
        <input type="submit" value="OK" />
      </form>
    );
  }
}

export default StockForm;
