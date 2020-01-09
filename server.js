const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const axios = require('axios')
const dataFetcher = require('./models/DataFetcher')

require('dotenv').config()

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'client')))

app.get('/finance/:symbol', async (req, res) =>{
  let symbol = req.params.symbol
  res.json(await dataFetcher.fetchQuote(symbol))
})

app.get('/week/:symbol', async (req, res) => {
  let symbol = req.params.symbol
  res.json(await dataFetcher.fetchWeekData(symbol))
})

server.listen(port, () => console.log(`Listening on port: ${port}`))

