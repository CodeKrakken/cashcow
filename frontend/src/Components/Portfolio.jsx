import React, { Component } from "react";
import Axios from "axios";

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
        console.log(res)
        let stocksPrices = []
        for(let i = 0; i < res.data.length; i++) {
          let stock = await this.getPrice(res.data[i].symbol)
          let details = await Axios.get(`/api/company/${stock.symbol}`)
          let formatted = {
            price : stock.price,
            open : stock.open,
            close : stock.prev_close,
            high : stock.high,
            low : stock.low,
            amount: res.data[i].amount,
            symbol : stock.symbol,
            percentageChange : stock.percent_change,
            website : details.data.website,
            companyName : details.data.companyName,
            exchange : details.data.exchange,
            total : parseInt((res.data[i].amount * stock.price).toFixed(2))
          }
          console.log(formatted)
          stocksPrices.push(formatted)
        }
        this.setState({stocksWithPrices : stocksPrices})
        console.log(this.state.stocksWithPrices)
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
    console.log(newValue)
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

        <div className="flex-grid portfolio-items-container">
          <div className="grid-row portfolio-item">
            <p className='grid-cell heading'></p>
            <div className="grid-cell grid-col-headings">
              <p className='grid-cell heading'>Symbol</p>
              <p className='grid-cell heading'>Price</p>
              <p className='grid-cell heading'>Quantity</p>
              <p className='grid-cell heading'>Total</p>
              <p className='grid-cell heading'>Change</p>
             </div>
           </div>
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
