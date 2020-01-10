const express = require('express')
const port = process.env.PORT || 5000
const app = express()
const server = require('http').createServer(app);
const axios = require('axios')
const Server = require('../server.js')
const dataFetcher = require('../models/DataFetcher.js')
const sinon = require('sinon')

describe("dataFetcher", () => {
  it("calls external api with right parameters", () => {
    const obj = {}
    const mock = sinon.mock(obj);
    const expectation = mock.expects('get')
    DataFetcher.fetchQuote('MSFT', dummy)

    expect(mock).toEqual(200)
  });
})
