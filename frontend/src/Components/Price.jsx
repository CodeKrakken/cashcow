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

  handleChangeClass() {
    if (this.state.change < 1) {
      return "negative"
    } else {
      return "positive"
    }
  }

  render() {
    return(
      <div className="price-container">
        <h1 className='price-item price-header'>{this.props.symbol} : ${this.state.price}</h1>
        <p className='price-item'><span>Open: {this.state.open}</span> <span>Close: {this.state.close}</span></p>
        <p className='price-item'> <span>High: {this.state.high}  Low: {this.state.low}</span></p>
        <p className='price-item'>Volume: {this.state.volume}</p>
        <p className='price-item'>Change: <span className={'price-item ' + this.handleChangeClass()}>{this.state.change}</span> / <span className={'price-item ' + this.handleChangeClass()}>{this.state.percentageChange}%</span></p>
      </div>
    )
  }
}

export default Price;
