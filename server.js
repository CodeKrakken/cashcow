const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const axios = require('axios')
const DataFetcher = require('./models/DataFetcher')
const NewsFetcher = require('./models/NewsFetcher')
const fs = require("fs")

require('dotenv').config()

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'client')))

app.get('/finance/:symbol', async (req, res) =>{
  let symbol = req.params.symbol
  res.json(await DataFetcher.fetchQuote(symbol))
})

app.get('/news/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let details = await DataFetcher.fetchCompanyDetails(symbol)
  let name = DataFetcher.getEncodedName(details)
  let result = await NewsFetcher.fetchArticles(name)
  console.log("Result:", result)
  let articles = NewsFetcher.parseArticles(result.articles)
  res.status(200).send(articles)
})

app.get('/week/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  res.json(await DataFetcher.fetchWeekData(symbol))
})

app.get('/finance/details/:symbol', async (req, res) => { //get company details
  let symbol = req.params.symbol
  let result = await DataFetcher.fetchCompanyDetails(symbol)
  res.status(200).send(result)
})

app.get('/data', async (req, res) => {
  let raw = fs.readFileSync('./spec/dummyData/timeseries.json')
  let data = JSON.parse(raw)
  res.json(data)
})

server.listen(port, () => console.log(`Listening on port: ${port}`))
