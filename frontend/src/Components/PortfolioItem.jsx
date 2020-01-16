import React, { Component } from "react";
import Axios from "axios";

class PortfolioItem extends React.Component{
  constructor(props) {
    super(props)
    this.state = {price : 0}
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
    this.props.updateTotal(this.props.amount * this.state.price)
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
        <div className="portfolio-item">
          <img className="portfolio-logo" src={`//logo.clearbit.com/${this.state.imgUrl}`}></img>
        <div className="portfolio-item-details">
          <p className='portfolio-item-detail'>{this.props.symbol} : ${this.state.price}</p>
          <p className='portfolio-item-detail'>Number of Stocks : {this.props.amount} </p>
          <p className='portfolio-item-detail'>Total Value : {this.props.amount * this.state.price}</p>
          <p className='portfolio-item-detail'> Change: <span className={'price-item ' + this.handleChangeClass()}>{this.state.change}</span> / <span className={'price-item ' + this.handleChangeClass()}>{this.state.percentageChange}%</span></p>
        </div>
        </div>
      </div>
    )
  }
}

export default PortfolioItem;
