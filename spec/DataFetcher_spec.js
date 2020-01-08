const DataFetcher = require('../models/DataFetcher')
const fs = require("fs")

describe("DataFetcher", () =>{
  describe(".parseQuote", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/dummy.json`);
    let dummyData = JSON.parse(rawDummy)

    it("parses a response", () => {
      expect(DataFetcher.parseQuote(dummyData)).toEqual({
        symbol: 'AAPL',
        open: 297.1600,
        high: 300.0500,
        low: 297.1560,
        price: 299.8400,
        volume: 9146058,
        last_trade_day: '2020-01-08',
        prev_close: 298.3900,
        change: 1.4500,
        percent_change: 0.4859,
      })
    })
  })

  describe(".parseWeekData", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/weekDummy.json`);
    let dummyData = JSON.parse(rawDummy)

    it("parses a response from the Time Series (Daily) API", () => {
      let expectedResponse = {
        symbol: 'AAPL',
        closePrices: [
          // NB last seven *working days* - no data on holidays/weekends
          // NB months in JavaScipt dates go from 0 (Jan) to 11 (Dec)
          {
            date: new Date(2020, 0, 8),
            closePrice: 302.7100,
          },
          {
            date: new Date(2020, 0, 7),
            closePrice: 298.3900
          },
          {
            date: new Date(2020, 0, 6),
            closePrice: 299.8000
          },
          {
            date: new Date(2020, 0, 3),
            closePrice: 297.4300
          },
          {
            date: new Date(2020, 0, 2),
            closePrice: 300.3500
          },
          {
            date: new Date(2019, 11, 31),
            closePrice: 293.6500
          },
          {
            date: new Date(2019, 11, 30),
            closePrice: 291.5200
          },
        ],
      }
      expect(DataFetcher.parseWeekData(dummyData, 'AAPL')).toEqual(expectedResponse);
    })
  })
})
