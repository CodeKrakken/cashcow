const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const server = require('http').createServer(app);
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
      const parseArticles = sinon.stub(NewsFetcher, "parseArticles")

      // send request to internal API
      await axios.get('http://localhost:5000/api/news/GOOGL')
      // restore functions - cleanup
      fetchCompanyDetails.restore()
      getEncodedName.restore()
      fetchArticles.restore()
      parseArticles.restore()
      // check what's happened
      sinon.assert.calledWith(fetchCompanyDetails, "GOOGL")
      sinon.assert.calledWith(getEncodedName, {data: {}})
      sinon.assert.calledWith(fetchArticles, "Google,%20Inc.")
      sinon.assert.calledWith(parseArticles, [])


    })
  //   it("respond with 200 on success", async () => {
  //     let result = await axios.get('http://localhost:5000/api/news/MSFT')
  //     expect(result.status).toEqual(200)
  //   });
  // })
  //
  // describe("GET /api/week/:symbol", () => {
  //   it("respond with 200 on success", async () => {
  //     let result = await axios.get('http://localhost:5000/api/week/MSFT')
  //     expect(result.status).toEqual(200)
  //   });
  // })
  //
  // describe("GET /api/finance/details/:symbol", () => {
  //   it("respond with 200 on success", async () => {
  //     let result = await axios.get('http://localhost:5000/api/finance/details/MSFT')
  //     expect(result.status).toEqual(200)
  //   });
  })

})
