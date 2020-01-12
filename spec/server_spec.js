const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const server = require('http').createServer(app);
const axios = require('axios')
const sinon = require('sinon')
const Server = require('../server.js')
const DataFetcher = require('../models/DataFetcher')

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

// describe("GET /api/news/:symbol", () => {
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
