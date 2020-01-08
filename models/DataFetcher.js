const axios = require('axios')

class DataFetcher {
  static async fetchQuote(symbol) {
    try {
      let key = process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      let result = await axios.get(endpoint)
      if (result.data["Global Quote"]) {
        let data = {
          symbol : result.data["Global Quote"]["01. symbol"],
          open : result.data["Global Quote"]["02. open"],
          high : result.data["Global Quote"]["03. high"],
          low : result.data["Global Quote"]["04. low"],
          price : parseFloat(result.data["Global Quote"]["05. price"]),
          volume : result.data["Global Quote"]["06. volume"],
          last_trade_day : result.data["Global Quote"]['07. latest trading day'],
          prev_close : result.data["Global Quote"]['08. previous close'],
          change : result.data["Global Quote"]['09. change'],
          percent_change : result.data["Global Quote"]['10. change percent']
        }
        return data
      } else {
        return result.data
      }
    } catch(err) {
        console.log(err)
    }
  }
}

module.exports = DataFetcher;
