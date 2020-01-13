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

if (process.env.NODE_ENV == 'development') {
  app.use('/', express.static(path.join(__dirname, 'frontend/public')))
} else if (process.env.NODE_ENV == 'production') {
  app.use('/', express.static(path.join(__dirname, 'frontend/build')))
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
  if (process.env.NODE_ENV == 'development') {
    res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
  } else if (process.env.NODE_ENV == 'production') {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
  }
})

app.get('/api/finance/:symbol', async (req, res) =>{
  let symbol = req.params.symbol
  res.json(await DataFetcher.fetchQuote(symbol))
})

app.get('/api/news/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let details = await DataFetcher.fetchCompanyDetails(symbol)
  let name = DataFetcher.getEncodedName(details)
  let result = await NewsFetcher.fetchArticles(name)
  let articles = NewsFetcher.parseArticles(result.articles)
  res.status(200).send(articles)
})

app.get('/api/week/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  let timeSeries = await DataFetcher.fetchTimeSeriesDaily(symbol, 7)
  res.json(timeSeries)
})

app.get('*', (req, res) => {
  if (process.env.NODE_ENV == 'development') {
    res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
  } else if (process.env.NODE_ENV == 'production') {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
  }
})

server.listen(port, () => console.log(`Listening on port: ${port}`))
