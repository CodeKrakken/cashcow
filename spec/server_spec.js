const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const axios = require('axios')
const sinon = require('sinon')
const Server = require('../server.js')
const DataFetcher = require('../models/DataFetcher')
const NewsFetcher = require('../models/NewsFetcher')

describe("server routes", () => {

  describe("GET /api/finance/:symbol", () => {
    it("calls DataFetcher.fetchQuote with the symbol", async () => {
      const fetchQuote = sinon.stub(DataFetcher, "fetchQuote")
      await axios.get('http://localhost:5000/api/finance/GOOGL')
      fetchQuote.restore()
      sinon.assert.calledWith(fetchQuote, "GOOGL")
    })

    it("respond with 200 on success", async () => {
      const fetchQuote = sinon.stub(DataFetcher, "fetchQuote")
      let result = await axios.get('http://localhost:5000/api/finance/GOOGL')
      fetchQuote.restore()
      expect(result.status).toEqual(200)
    });
  });

  describe("GET /api/news/:symbol", () => {
    it("calls functions on DataFetcher to get company details, get name, articles and parse articles", async () => {
      // stub functions
      const fetchCompanyDetails = sinon.stub(DataFetcher, "fetchCompanyDetails")
      fetchCompanyDetails.returns({data: {}})
      const getEncodedName = sinon.stub(DataFetcher, "getEncodedName")
      getEncodedName.returns("Google,%20Inc.")
      const fetchArticles = sinon.stub(NewsFetcher, "fetchArticles")
      fetchArticles.returns({articles: []})
      const parseArticles = sinon.stub(NewsFetcher, "parseArticles") // send request to internal API
      await axios.get('http://localhost:5000/api/news/GOOGL')
      fetchCompanyDetails.restore() // restore functions - cleanup
      getEncodedName.restore()
      fetchArticles.restore()
      parseArticles.restore()
      // assertions
      sinon.assert.calledWith(fetchCompanyDetails, "GOOGL")
      sinon.assert.calledWith(getEncodedName, {data: {}})
      sinon.assert.calledWith(fetchArticles, "Google,%20Inc.")
      sinon.assert.calledWith(parseArticles, [])
    })

    it("responds with 200 on success", async () => {
      // stubs
      const fetchCompanyDetails = sinon.stub(DataFetcher, "fetchCompanyDetails")
      const getEncodedName = sinon.stub(DataFetcher, "getEncodedName")
      const fetchArticles = sinon.stub(NewsFetcher, "fetchArticles")
      fetchArticles.returns({articles: []})
      const parseArticles = sinon.stub(NewsFetcher, "parseArticles")
      const result = await axios.get('http://localhost:5000/api/news/GOOGL') // send request to internal API
      fetchCompanyDetails.restore() // cleanup
      getEncodedName.restore()
      fetchArticles.restore()
      parseArticles.restore()
      expect(result.status).toEqual(200) // assertion
    });
  });

  describe("GET /api/week/:symbol", () => {
    it("calls Datafetcher.fetchTimeSeriesDaily with the expected symbol", async () => {
      const fetchTimeSeriesDaily = sinon.stub(DataFetcher, "fetchTimeSeriesDaily")
      await axios.get('http://localhost:5000/api/week/GOOGL')
      fetchTimeSeriesDaily.restore()
      sinon.assert.calledWith(fetchTimeSeriesDaily, "GOOGL")
    })

    it("respond with 200 on success", async () => {
      const fetchTimeSeriesDaily = sinon.stub(DataFetcher, "fetchTimeSeriesDaily")
      const result = await axios.get('http://localhost:5000/api/week/GOOGL')
      fetchTimeSeriesDaily.restore()
      expect(result.status).toEqual(200)
    });
  })
})
