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
    this.props.onSymbolChange(this.state.localSymbol.toUpperCase());
    this.setState({localSymbol : ""}) // clears form
    event.preventDefault();
  }

  render() {
    return(
      <div className='search-stock-form'>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter a symbol" onChange={this.handleChange} />
          <button className="btn btn-secondary" type="submit">OK</button>
        </form>
      </div>
    );
  }
}

export default StockForm;
