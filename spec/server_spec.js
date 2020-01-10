const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const server = require('http').createServer(app);
const axios = require('axios')
const Server = require('../server.js')

describe("GET /finance/:symbol", () => {
  it("respond with 200 on success", async () => {
    let result = await axios.get('http://localhost:5000/api/finance/MSFT')
    expect(result.status).toEqual(200)
  });
  it("respond with error message on fail", async () => {
    let result = await axios.get('http://localhost:5000/api/finance/nonexistant')
    expect(result.data).toEqual({
    'Error Message': 'Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for GLOBAL_QUOTE.'
    });
  })
  it("returns requested symbol", async () => {
    let result = await axios.get('http://localhost:5000/api/finance/GOOGL')
    expect(result.data.symbol).toEqual("GOOGL");
  })
})

describe("GET /news/:symbol", () => {
  it("respond with 200 on success", async () => {
    let result = await axios.get('http://localhost:5000/api/news/MSFT')
    expect(result.status).toEqual(200)
  });
})

describe("GET /week/:symbol", () => {
  it("respond with 200 on success", async () => {
    let result = await axios.get('http://localhost:5000/api/week/MSFT')
    expect(result.status).toEqual(200)
  });
})

describe("GET /finance/details/:symbol", () => {
  it("respond with 200 on success", async () => {
    let result = await axios.get('http://localhost:5000/api/finance/details/MSFT')
    expect(result.status).toEqual(200)
  });
})
