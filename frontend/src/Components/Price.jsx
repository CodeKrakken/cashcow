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
      this.setState({price : result.price.toFixed(2)})
    })
    .catch((err) => {
      console.log('failed to fetch - may be over API limit');
    })
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
