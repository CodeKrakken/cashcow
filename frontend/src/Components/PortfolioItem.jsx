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
        total : parseFloat((result.price * this.props.amount).toFixed(2)),
        percentageChange : parseFloat(result.percent_change.toFixed(2))
      })
      return result
    }).then(res => {
      console.log(this.state.total)
      this.props.updatePrices(this.state.total)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  componentDidMount() {
    console.log(this.props)
    this._fetchData(this.props.symbol)
    this.fetchDetails(this.props.symbol)
    this.setState({total : parseFloat((this.props.amount * this.state.price).toFixed(2))})
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
      <div className="grid-row portfolio-item">
        <div className="grid-cell portfolio-logo-container">
           <img className="portfolio-logo" src={`//logo.clearbit.com/${this.state.imgUrl}`}></img>
        </div>
        
        <div className="grid-cell portfolio-item-details">
          <p className='grid-cell portfolio-item-detail'>{this.props.symbol}</p>
          <p className='grid-cell portfolio-item-detail'>${this.state.price}</p>
          <p className='grid-cell portfolio-item-detail'>{this.props.amount}</p>
          <p className='grid-cell portfolio-item-detail'>${this.state.total}</p>
          <p className='grid-cell portfolio-item-detail'>
            <span className={'price-item ' + this.handleChangeClass()}>
              {this.state.change}
            </span> 
              / 
            <span className={'price-item ' + this.handleChangeClass()}>
              {this.state.percentageChange}%
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default PortfolioItem;
