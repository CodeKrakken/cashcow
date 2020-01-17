import React, { Component } from "react";
import Axios from "axios";
import PortfolioItem from './PortfolioItem'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalValue : sessionStorage.getItem("portfolioValue"),
      stocks : [],
      stocksWithPrices : [],
      symbolText : "",
      amountText : "",
      prices : []
    }
  }

  getStocks = () => {
    try {
      Axios.get(`/api/stocks/${this.props.userId}`)
      .then(res => {
        let stocks = res.data
        if (stocks == "") {
          this.setState({noStocks : true})
        } else {
          this.setState({noStocks : false})
          this.setState({stocks : stocks})
          return res
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  getPrice = async (symbol) => {
    let stock = await Axios.get(`/api/finance/${symbol}`)
    return stock.data
  }

  updatePrices = (amount) => {
    let stocks = this.state.prices
    stocks.push(amount)
    this.setState({prices : stocks})
    this.handleTotal()
  }

  handleSymbolTextChange = (event) => {
    this.setState({symbolText: event.target.value});
  }

  handleAmountTextChange = (event) => {
    this.setState({amountText: event.target.value});
  }

  handleSubmit = () => {
    let symbol = this.state.symbolText
    let amount = this.state.amountText
    let userId = this.props.userId
    Axios.post('/api/stocks/new', {symbol, amount, userId})
  }

  handleNoStocks = () => {
    if (this.state.noStocks ==  true) {
      return(
        <div>No Stocks Yet!</div>
      )
    }
  }

  handleTotal = () => {
    let sum = 0
    let prices = this.state.prices
    for(let i = 0; i < prices.length; i++) {
      sum += prices[i]
    }
    sessionStorage.setItem("portfolioValue", sum)
    this.setState({totalValue : sum.toFixed(2)})
  }

  handleChangeClass = (price) => {
    if (price < 0) {
      return "negative"
    } else {
      return "positive"
    }
  }

  async componentDidMount() {
    this.getStocks()
    this.handleTotal()
  }

  render() {
    return (
      <div className="portfolio-container">
        { this.handleNoStocks() }
        <div className="portfolio-header">
          <div className="totalValue">
            <h2>Total: ${this.state.totalValue}</h2>
          </div>

          <div className="add-stock-form">
            <form onSubmit={this.handleSubmit}>
              <ul>
                <li className="add-info-container">
                  <input
                    type="text"
                    placeholder="Symbol"
                    value={this.state.symbolText}
                    onChange={this.handleSymbolTextChange}
                  />
                </li>
                <li className="add-info-container">
                  <input type="text"
                    placeholder="Number of stocks"
                    value={this.state.amountText}
                    onChange={this.handleAmountTextChange}
                   />
                </li>
                <li>
                  <button className="btn btn-secondary" type="submit">Add</button>
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="flex-grid portfolio-items-container">
          <div className="grid-row portfolio-item">
            <div className="grid-cell portfolio-logo-container">
              <img className='portfolio-logo'></img>
            </div>
            <div className="grid-cell grid-col-headings">
              <p className='grid-cell heading'>Symbol</p>
              <p className='grid-cell heading'>Price</p>
              <p className='grid-cell heading'>Quantity</p>
              <p className='grid-cell heading'>Total</p>
              <p className='grid-cell heading'>Change</p>
            </div>
           </div>
          {this.state.stocks.map((stock, index) => (
            <PortfolioItem 
              updatePrices={this.updatePrices} 
              key={index} 
              symbol={stock.symbol} 
              amount={stock.amount}>
            </PortfolioItem>
          ))}
          {this.state.stocksWithPrices.map((stock, index) => (
           <div className="grid-row portfolio-item">
            <div className="portfolio-logo-container">
               <img className="portfolio-logo" src={`//logo.clearbit.com/${stock.website}`}></img>
            </div>
           <div key={index}className="grid-cell portfolio-item-details">
             <p className='grid-cell portfolio-item-detail'>{stock.symbol}</p>
             <p className='grid-cell portfolio-item-detail'>${stock.price}</p>
             <p className='grid-cell portfolio-item-detail'>{stock.amount} </p>
             <p className='grid-cell portfolio-item-detail'>{stock.total}</p>
             <p className='grid-cell portfolio-item-detail'>
              <span className={'price-item ' + this.handleChangeClass()}>
                {stock.change}
              </span>
              / 
              <span className={'price-item ' + this.handleChangeClass()}>
                {stock.percentageChange}%
              </span>
            </p>
           </div>
         </div>
          ))} 
        </div>
      </div>
    )
  }
}

export default Portfolio;
