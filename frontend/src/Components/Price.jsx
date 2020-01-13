import React, { Component } from "react";
import Axios from "axios";

class Price extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Axios.get(`/api/finance/${this.props.symbol}`)
    .then(res => {
      let result = res.data
      console.log(result)
      this.setState({
        price : result.price.toFixed(2),
        open : result.open.toFixed(2),
        high : result.high.toFixed(2),
        low : result.low.toFixed(2),
        close : result.prev_close.toFixed(2),
        volume : result.volume,
        change : result.change.toFixed(2),
        percentageChange : result.percent_change.toFixed(2)
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return(
      <div>
        <h1>{this.props.symbol} : ${this.state.price}</h1>
        <p>Open: {this.state.open}</p>
        <p>Close: {this.state.close}</p>
        <p>High: {this.state.high}</p>
        <p>Low: {this.state.low}</p>
        <p>Volume: {this.state.volume}</p>
        <p>Change: {this.state.change}</p>
        <p>Percentage Change: {this.state.percentageChange}%</p>
      </div>
    )
  }
}

export default Price;
