import React, { Component } from "react";
import Axios from "axios";


class Price extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    Axios.get(`/finance/${this.props.symbol}`)
    .then(res => {
      this.setState({price : res.data[0].lastSalePrice})
    })
  }  

  render() {
    return(
      <div>
        {this.props.symbol} : {this.state.price}
      </div>
    )
  }
}

export default Price;