const DataFetcher = require('../models/DataFetcher')
const fs = require("fs")
const sinon = require('sinon')
const axios = require('axios')

describe("DataFetcher", () => {
  describe(".fetchQuote", () => {
    it("check that fetchquote calls axios.get with expected endpoint", () => {
      const expectedEndpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=${process.env.AV_KEY}`
      const get = sinon.stub(axios, "get")
      get.returns({ data: {} })
      DataFetcher.fetchQuote("GOOGL")
      get.restore()
      sinon.assert.calledWith(get, expectedEndpoint)
    })
  })

  describe("fetchTimeSeriesDaily", () => {
    it("check that fetchTimeSeriesDaily calls axios.get with expected endpoint", () => {
      const expectedEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&apikey=${process.env.AV_KEY}`
      const get = sinon.stub(axios, "get")
      get.returns({ data: {} })
      DataFetcher.fetchTimeSeriesDaily("GOOGL")
      get.restore()
      sinon.assert.calledWith(get, expectedEndpoint)
    })
  })

  describe(".parseQuote", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummy.json`);
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

  describe(".parseTimeSeriesData", () => {
    let rawDummy = fs.readFileSync(`${__dirname}/dummyData/weekDummy.json`);
    let dummyData = JSON.parse(rawDummy)

    it("parses a response from the Time Series (Daily) API", () => {
      let expectedResponse = [
        // NB last seven *working days* - no data on holidays/weekends
        {
          date: new Date("2020-1-8"),
          high: '303.2300',
          low: '297.1560',
          open: '297.1600',
          close: '302.7100',
          volume: '22192266',
        },
        {
          date: new Date("2020-1-7"),
          high: '300.9000',
          low: '297.4800',
          open: '299.8400',
          close: '298.3900',
          volume: '26221027',
        },
        {
          date: new Date("2020-1-6"),
          high: '299.9600',
          low: '292.7500',
          open: '293.7900',
          close: '299.8000',
          volume: '29644644',
        },
        {
          date: new Date("2020-1-3"),
          high: '300.5800',
          low: '296.5000',
          open: '297.1500',
          close: '297.4300',
          volume: '36633878',
        },
        {
          date: new Date("2020-1-2"),
          high: '300.6000',
          low: '295.1900',
          open: '296.2400',
          close: '300.3500',
          volume: '33911864',
        },
        {
          date: new Date("2019-12-31"),
          high: '293.6800',
          low: '289.5200',
          open: '289.9300',
          close: '293.6500',
          volume: '25247625',
        },
        {
          date: new Date("2019-12-30"),
          high: '292.6900',
          low: '285.2200',
          open: '289.4600',
          close: '291.5200',
          volume: '36059614',
        },
      ]
      expect(DataFetcher.parseTimeSeriesData(dummyData, 7)).toEqual(expectedResponse);
    })
  })

  describe(".getEncodedName", () => {
    it("returns Microsoft Corp from json data", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummyMicrosoft.json`);
      let dummyData = JSON.parse(rawDummy)
      expect(DataFetcher.getEncodedName(dummyData)).toEqual("Microsoft%20Corp.")
    })

    it("returns Apple Inc from json data", () => {
      let rawDummy = fs.readFileSync(`${__dirname}/dummyData/dummyApple.json`);
      let dummyData = JSON.parse(rawDummy)
      expect(DataFetcher.getEncodedName(dummyData)).toEqual("Apple,%20Inc.")
    })
  })

  describe("fetchCompanyDetails", () => {
    it("checks that fetchCompanyDetails calls axios.get with expected endpoint", () => {
      const expectedEndpoint = `https://cloud.iexapis.com/stable/stock/GOOGL/company?token=${process.env.API_KEY}`
      const get = sinon.stub(axios, "get")
      get.returns({ data: {} })
      DataFetcher.fetchCompanyDetails("GOOGL")
      get.restore()
      sinon.assert.calledWith(get, expectedEndpoint)
    })
  })
})
