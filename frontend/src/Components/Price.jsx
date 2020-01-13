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
      this.setState({price : result.price.toFixed(2)})
    })
    .catch((err) => {
      console.log('failed to fetch - may be over API limit');
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

  render() {
    return(
      <div>
        {this.props.symbol} : ${this.state.price}
      </div>
    )
  }
}

export default Price;
