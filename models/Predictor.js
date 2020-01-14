const DataFetcher = require('./DataFetcher')

class Predictor {
  static movingAverage(data, size = 100) {
    if ((data instanceof Array)) {
      try {
        let closePrices = data.map((item) => {
          return parseFloat(item.close)
        })
        closePrices = closePrices.slice(0, size)
        let sum = closePrices.reduce((acc, curr) => {
          return acc += curr
        })
        let movingAverage = parseFloat((sum / closePrices.length).toFixed(2))
        return {
          movingAverage : movingAverage,
          size : closePrices.length
        } 
      } catch (err) {
        console.log(err)
        return null
      }
    } else {
      console.log(data)
      return {
        movingAverage : "Data Limit Exceeded",
        size : 0
      }
    }
  }
}

module.exports = Predictor