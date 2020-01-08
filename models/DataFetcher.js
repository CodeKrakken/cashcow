const axios = require('axios')

class DataFetcher {
  static async fetchQuote(symbol) {
    try {
      let key = process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      let response = await axios.get(endpoint)
      return this.parseQuote(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  static parseQuote(result) {
    if (result["Global Quote"]) {
      let data = {
        symbol : result["Global Quote"]["01. symbol"],
        open : parseFloat(result["Global Quote"]["02. open"]),
        high : parseFloat(result["Global Quote"]["03. high"]),
        low : parseFloat(result["Global Quote"]["04. low"]),
        price : parseFloat(result["Global Quote"]["05. price"]),
        volume : parseInt(result["Global Quote"]["06. volume"]),
        last_trade_day : result["Global Quote"]['07. latest trading day'],
        prev_close : parseFloat(result["Global Quote"]['08. previous close']),
        change : parseFloat(result["Global Quote"]['09. change']),
        percent_change : parseFloat(result["Global Quote"]['10. change percent'])
      }
      return data
    } else {
      return result
    }
  }

  static async fetchWeekData(symbol) {
    try {
      let key = process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`
      let response = await axios.get(endpoint)
      return this.parseWeekly(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  static parseWeekly(result) {

    // currently all results from past 100 days
    if (result["Time Series (Daily)"]) {
      let data = {
        result: result["Time Series (Daily)"],
      }
      return data
    } else {
      return result
    }
  }
}

module.exports = DataFetcher;
