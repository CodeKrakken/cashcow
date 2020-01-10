const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const axios = require('axios')
const DataFetcher = require('./models/DataFetcher')
const NewsFetcher = require('./models/NewsFetcher')

require('dotenv').config()

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'frontend/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
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
  res.status(200).send(result.articles)
})

app.get('/api/week/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  res.json(await DataFetcher.fetchWeekData(symbol))
})

app.get('/api/finance/details/:symbol', async (req, res) => { //get company details
  let symbol = req.params.symbol
  let result = await DataFetcher.fetchCompanyDetails(symbol)
  res.status(200).send(result)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
})

server.listen(port, () => console.log(`Listening on port: ${port}`))
