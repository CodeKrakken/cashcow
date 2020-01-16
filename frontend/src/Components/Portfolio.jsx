import React, { Component } from "react";
import Axios from "axios";
import PortfolioItem from './PortfolioItem'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalValue : 0,
      stocks : [],
      stocksWithPrices : [],
      symbolText : "",
      amountText : ""
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
      }).then(async res => {
        let stocksPrices = []
        for(let i = 0; i < res.data.length; i++) {
          let stock = await this.getPrice(res.data[i].symbol)
          // let details = await Axios.get(`/api/company/${stock.symbol}`)
          let formatted = {
            price : stock.price,
            open : stock.open,
            close : stock.prev_close,
            high : stock.high,
            low : stock.low,
            amount: res.data[i].amount,
            symbol : stock.symbol,
            percentageChange : stock.percent_change,
            // website : details.data.website,
            // companyName : details.data.companyName,
            // exchange : details.data.exchange,
            total : parseInt((res.data[i].amount * stock.price).toFixed(2))
          }
          stocksPrices.push(formatted)
        }
        this.setState({stocksWithPrices : stocksPrices})
        this.handleTotal()
      })
    } catch (err) {
      console.log(err)
    }
  }

  getPrice = async (symbol) => {
    let stock = await Axios.get(`/api/finance/${symbol}`)
    return stock.data
  }

  updateTotalValue = (amount) => {
    let totalValue = this.state.totalValue
    let newValue = totalValue + amount
    this.setState({totalValue : newValue})
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
      console.log("hello")
      return(
        <div>No Stocks Yet!</div>
      )
    }
  }

  handleTotal = () => {
    let sum = 0
    let stocks = this.state.stocksWithPrices
    for(let i =0; i < stocks.length; i++) {
      console.log(stocks[i])
      sum += stocks[i].total
    }
    console.log("sum : ", sum)
    this.setState({totalValue : sum})
  }

  handleChangeClass = () => {
    if (this.state.change < 1) {
      return "negative"
    } else {
      return "positive"
    }
  }

  async componentDidMount() {
    this.getStocks()
  }

  render() {
    return (
      <div>
        { this.handleNoStocks() }
        <form onSubmit={this.handleSubmit}>
          <label>
            <h1>Add Stock</h1><br></br>
          </label>

          <label>
            Symbol:
            <input type="text" value={this.state.symbolText} onChange={this.handleSymbolTextChange} />
          </label>
          <label>
            Number of Stocks:
            <input type="text" value={this.state.amountText} onChange={this.handleAmountTextChange} />
          </label>
          <input type="submit" value="OK"/>
        </form>
        <div>
          {this.state.stocksWithPrices.map((stock, index) => (
           <div className="portfolio-item">
           {/* <img className="portfolio-logo" src={`//logo.clearbit.com/${stock.website}`}></img> */}
           <div key={index}className="portfolio-item-details">
             <p className='portfolio-item-detail'>{stock.symbol}</p>
             <p className='portfolio-item-detail'>${stock.price}</p>
             <p className='portfolio-item-detail'>{stock.amount} </p>
             <p className='portfolio-item-detail'>{stock.total}</p>
             <p className='portfolio-item-detail'><span className={'price-item ' + this.handleChangeClass()}>{stock.change}</span> / <span className={'price-item ' + this.handleChangeClass()}>{stock.percentageChange}%</span></p>
           </div>
         </div>
          ))}
        </div>
          <div>Total Portfolio Value : ${this.state.totalValue}</div>
        <div>
        </div>
      </div>
    )
  }
}

export default Portfolio;