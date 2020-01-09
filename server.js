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

app.use('/', express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
  res.send("visit http://cashcow20.herokuapp.com/ to make your moolions with CashCow")
}

app.get('/finance/:symbol', async (req, res) =>{
  let symbol = req.params.symbol
  console.log(res.data)
  res.json(await DataFetcher.fetchQuote(symbol))
})

app.get('/news/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  // res.json(await NewsFetcher.fetchArticles)
  let result = await NewsFetcher.fetchArticles(symbol)
  console.log(result)
})

app.get('/week/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  res.json(await DataFetcher.fetchWeekData(symbol))
})

server.listen(port, () => console.log(`Listening on port: ${port}`))

