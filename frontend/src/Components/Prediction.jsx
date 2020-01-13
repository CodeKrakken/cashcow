import React from 'react';
import Axios from 'axios';

class Prediction extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    let sma = await Axios.get(`/api/prediction/${this.props.symbol}`)
    sma = sma.data.data
    let currPrice = await Axios.get(`/api/finance/${this.props.symbol}`)
    currPrice = currPrice.data.price
    console.log(currPrice)
    this.setState({
      movingAverage : sma,
      currentPrice : currPrice,
      smaDifference : currPrice - sma
    })
    console.log(this.state)
  }

  handleMovingAveragePrediction () {
    if (this.state.currentPrice > this.state.movingAverage) {
      return(<p>Sell!</p>)
    } else {
      return(<p>Buy!</p>)
    }
  }

  handlePriceDifferenceText() {
    if (this.state.smaDifference < 1) {
      return ["negative", "lower"]
    } else {
      return ["positive", "higher"]
    }
  }

  handleSmaPriceDifference() {
    console.log(typeof this.state.currentPrice)
    let percentageDiff = (Math.abs(this.state.smaDifference / this.state.currentPrice)) * 100
    return `${(percentageDiff).toFixed(2)}%`
  }

  render() {
    return(
      <div>
        <h1 className={this.handlePriceDifferenceText()[0]}>{this.handleMovingAveragePrediction()}</h1> 
        <p>The current price is {this.handleSmaPriceDifference()} {this.handlePriceDifferenceText()[1]} than the 100 day moving average!</p>
      </div>
    )
  }
}

export default Prediction