const axios = require('axios')

class DataFetcher {
  static async fetchQuote(symbol) {
    try {
      let key = this.randomKey() || process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      let response = await axios.get(endpoint)
      return this.parseQuote(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  static parseQuote(result) {
    if (result['Global Quote']) {
      const data = {
        symbol : result['Global Quote']['01. symbol'],
        open : parseFloat(result['Global Quote']['02. open']),
        high : parseFloat(result['Global Quote']['03. high']),
        low : parseFloat(result['Global Quote']['04. low']),
        price : parseFloat(result['Global Quote']['05. price']),
        volume : parseInt(result['Global Quote']['06. volume']),
        last_trade_day : result['Global Quote']['07. latest trading day'],
        prev_close : parseFloat(result['Global Quote']['08. previous close']),
        change : parseFloat(result['Global Quote']['09. change']),
        percent_change : parseFloat(result['Global Quote']['10. change percent'])
      }
      return data
    } else {
      return result
    }
  }

  static async fetchTimeSeriesDaily(symbol, size) {
    try {
      let key = this.randomKey() || process.env.AV_KEY
      let endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${key}`
      let response = await axios.get(endpoint)
      return this.parseTimeSeriesData(response.data, size)
    } catch(err) {
      console.log(err)
    }
  }

  static randomKey() {
    let keys = [process.env.AV_KEY, process.env.AV_KEY_2, process.env.AV_KEY_3, process.env.AV_KEY_4]
    let index = Math.floor((Math.random() * (keys.length - 1)))
    console.log(keys[index])
    return keys[index]
  }

  // parsers could be in own class?
  static parseTimeSeriesData(result, size) {
    if (result['Time Series (Daily)']) {
      let allPrices = Object.keys(result['Time Series (Daily)']).map((key) => {
        return [key, result['Time Series (Daily)'][key]]
      })
      let weekPrices = allPrices.slice(0, size)
      // weekQuoteData is an Array of Objects

      let weekQuoteData = weekPrices.map((dayPriceInfo) => {
        return {
          date: new Date(dayPriceInfo[0]),
          high: dayPriceInfo[1]['2. high'],
          low: dayPriceInfo[1]['3. low'],
          open: dayPriceInfo[1]['1. open'],
          close: dayPriceInfo[1]['4. close'],
          volume: dayPriceInfo[1]['5. volume']
        }
      })
      return weekQuoteData
    } else {
      return result
    }
  }

  static async fetchCompanyDetails(symbol) {
    try {
      let key = process.env.API_KEY
      let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${key}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  static getEncodedName(data) {
    let encodedName = encodeURI(data.companyName)
    return encodedName
  }
}

module.exports = DataFetcher;
