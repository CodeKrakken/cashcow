import React, { Component } from "react";
import Axios from "axios";

class PortfolioItem extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      price : 0,
      total : 0
    }
  }

  _fetchData = (symbol) => {
    Axios.get(`/api/finance/${symbol}`)
    .then(res => {
      let result = res.data
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
      return result
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  componentDidMount() {
    this._fetchData(this.props.symbol)
    this.fetchDetails(this.props.symbol)
    this.setState({total : parseFloat((this.props.amount * this.state.price).toFixed(2))})
    this.props.updateTotal(this.state.total)
  }


  fetchDetails = async (symbol) => {
    let data = await Axios.get(`/api/company/${this.props.symbol}`)
    this.setState({imgUrl : data.data.website})
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this._fetchData(this.props.symbol)
      this.fetchDetails(this.props.symbol)
    }
  }
  
  handleChangeClass = () => {
    if (this.state.change < 1) {
      return "negative"
    } else {
      return "positive"
    }
  }

  render() {
    return(
      <div className="">
        
      </div>
    )
  }
}

export default PortfolioItem;
