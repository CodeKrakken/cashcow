import React, { Component } from "react";
import Axios from "axios";
import PortfolioItem from './PortfolioItem'

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks : [],
      stocksWithPrices : [],
      symbolText : "",
      amountText : ""
    }
  }

  getStocks = () => {
    console.log("Getting stocks")
    try {
      Axios.get(`/api/stocks/${this.props.userId}`)
      .then(res => {
        let stocks = res.data
        if (stocks == "") {
          this.setState({noStocks : true})
          console.log(this.state)
          console.log(this.props)

        } else {
          this.setState({noStocks : false})
          this.setState({stocks : stocks})
        }
      })

    } catch (err) {
      console.log(err)
    }
  }


  getPrice = async (symbol) => {
    let stock = await Axios.get(`/api/finance/${symbol}`)
    console.log(stock)
    return stock.data
  }

  getPrices = async () => {
    let stocks = await this.state.stocks.map(async (stock, index) => {
      console.log(stock)
      let returnedVal = await this.getPrice(stock.symbol)
      this.setState({stocksWithPrices : stocks})
      console.log(this.state.stocksWithPrices)
      return returnedVal
    })
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
    if (this.noStocks) {
      console.log("hello")
      return(
        <div>No Stocks Yet!</div>
      )
    }
  }

  async componentDidMount() {
    console.log("Mounting")
    this.getStocks()
  }

  render() {
    return (
      <div>
        { this.handleNoStocks() }
        <div>
          {this.state.stocks.map((stock, index) => (
            <PortfolioItem key={index} symbol={stock.symbol} amount={stock.amount}></PortfolioItem>
          ))}
        </div>
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Stock
          </label>
          <br></br>
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
        </div>
      </div>
    )
  }
}

export default Portfolio;