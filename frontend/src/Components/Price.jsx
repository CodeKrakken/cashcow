import React, { Component } from "react";
import Axios from "axios";

class Price extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  _fetchData(symbol) {
    Axios.get(`/api/finance/${symbol}`)
    .then(res => {
      let result = res.data
      if (result['symbol']) {
        this.setState({
          price : parseFloat(result.price.toFixed(2)),
          open : parseFloat(result.open.toFixed(2)),
          high : parseFloat(result.high.toFixed(2)),
          low : parseFloat(result.low.toFixed(2)),
          close : parseFloat(result.prev_close.toFixed(2)),
          volume : result.volume,
          change : parseFloat(result.change.toFixed(2)),
          percentageChange : parseFloat(result.percent_change.toFixed(2))
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this._fetchData(this.props.symbol)
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this._fetchData(this.props.symbol)
    }
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
        <div className="price-items">
          <h1 className='price-item price-header'><span>${this.state.price}</span></h1>
          <p className='price-item'><span>Open: {this.state.open}</span> <span>Close: {this.state.close}</span></p>
          <p className='price-item'> <span>High: {this.state.high}  Low: {this.state.low}</span></p>
          <p className='price-item'>Volume: {this.state.volume}</p>
          <p className='price-item'>Change: <span className={'price-item ' + this.handleChangeClass()}>{this.state.change}</span> / <span className={'price-item ' + this.handleChangeClass()}>{this.state.percentageChange}%</span></p>
        </div>
      </div>
    )
  }
}

export default Price;
