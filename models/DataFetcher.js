const axios = require('axios')

class DataFetcher {
  static async fetchQuote(symbol) {
    try {
      let key = process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      let response = await axios.get(endpoint)
      console.log(response.data)
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
      console.log(data)
      return data
    } else {
      return result
    }
  }
}

module.exports = DataFetcher;
