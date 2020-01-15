import React from 'react';
import Axios from 'axios';

class Prediction extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    await this.fetchData(this.props.symbol)
  }

  async fetchData(symbol) {
    let movingAverage = await Axios.get(`/api/prediction/${symbol}`)
    let movingAverageSize = movingAverage.data.size
    let currPrice = await Axios.get(`/api/finance/${symbol}`)
    movingAverage = movingAverage.data.movingAverage
    currPrice = currPrice.data.price
    this.setState({
      movingAverage : movingAverage,
      movingAverageSize : movingAverageSize,
      currentPrice : currPrice,
      smaDifference : currPrice - movingAverage
    })
  }

  async componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      await this.fetchData(this.props.symbol)
    }
  }

  handleMovingAveragePrediction () {
    if (this.state.currentPrice > this.state.movingAverage) {
      return("Sell!")
    } else if (this.state.currentPrice < this.state.movingAverage) {
      return("Buy!")
    } else {
      return ("Stick!")
    }
  }

  handlePriceDifferenceText() { // not working as expected
    if (this.state.currentPrice < this.state.movingAverage) {
      return ["positive", "lower"]
    } else {
      return ["negative", "higher"]
    }
  }

  handleSmaPriceDifference() {
    let percentageDiff = (Math.abs(this.state.smaDifference / this.state.currentPrice)) * 100
    return `${(percentageDiff).toFixed(2)}%`
  }

  handlePredictionText() {
    if (this.handleMovingAveragePrediction() != "Stick!") {
      return (
        <p>The current price is {this.handleSmaPriceDifference()} {this.handlePriceDifferenceText()[1]} than the {this.state.movingAverageSize} day moving average!</p>
      )
    } else {
      return (
        <p>Cannot make prediction! Not enough data available.</p>
      )
    }
  }

  render() {
    return(
      <div>
        <h1 className={this.handlePriceDifferenceText()[0]}>{this.handleMovingAveragePrediction()}</h1> 
        {this.handlePredictionText()}
      </div>
    )
  }
}

export default Prediction