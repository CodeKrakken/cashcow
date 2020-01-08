const DataFetcher = require('../models/DataFetcher')
const fs = require("fs")

describe("DataFetcher", () =>{
  let rawDummy = fs.readFileSync(`${__dirname}/dummy.json`);
  let dummyData = JSON.parse(rawDummy)

  beforeEach(() => {
    axios = {
      get : () => {
        return "axios"
      }
    }
    spyOn(axios, 'get')
  })
  
  describe(".parseQuote", () => {
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
        percent_change: 0.4859
      })
    })
  })
})
