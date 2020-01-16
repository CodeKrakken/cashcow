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
          {this.state.stocks.map((stock, index) => (
            <PortfolioItem updatePrices={this.updatePrices} key={index} symbol={stock.symbol} amount={stock.amount}></PortfolioItem>
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