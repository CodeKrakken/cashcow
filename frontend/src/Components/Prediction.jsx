import React from 'react';
import Axios from 'axios';

class Prediction extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    let sma = await Axios.get(`/api/prediction/${this.props.symbol}`)
    let currPrice = await Axios.get(`/api/finance/${this.props.symbol}`)
    this.setState({
      movingAverage : sma,
      currentPrice : currPrice
    })
  }

  handleMovingAveragePrediction () {
    if (this.state.currentPrice > this.state.movingAverage) {
      return(<p>Sell!</p>)
    } else {
      return(<p>Buy!</p>)
    }
  }

  render() {
    return(
      <div>{this.handleMovingAveragePrediction()}</div>
    )
  }
}

export default Prediction