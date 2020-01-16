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

  updateTotalValue = (amount) => {
    this.setState({totalValue : (this.state.totalValue + amount)})
  }

  getPrices = async () => { // figure this out!
    let stocks = await this.state.stocks.map(async (stock, index) => {
      let returnedVal = await this.getPrice(stock.symbol)
      this.setState({stocksWithPrices : stocks})
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
    if (this.noStocks ==  true) {
      console.log("hello")
      return(
        <div>No Stocks Yet!</div>
      )
    }
  }

  async componentDidMount() {
    this.getStocks()
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
                  <button className="btn btn-secondary"
 type="submit">Add</button>
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="portfolio-items-container">
          {this.state.stocks.map((stock, index) => (
            <div className="portfolio-item">
              <PortfolioItem 
                key={index} 
                symbol={stock.symbol}
                amount={stock.amount}
                updateTotal={this.updateTotalValue}>
              </PortfolioItem>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Portfolio;
