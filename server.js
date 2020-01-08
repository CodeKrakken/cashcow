const express = require("express")
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const app = express()
const server = require("http").createServer(app);
const path = require('path');
const axios = require("axios")

require('dotenv').config()

app.use(bodyParser.json())

async function getIEX(symbol) {
  try {
    let result = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${process.env.API_KEY}&symbols=${symbol}`)
    res.json(result.data)
  } catch (err) {
    console.log(err)
  }
}

async function fetchQuote(symbol) {
  let key = process.env.AV_KEY
  let endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
  let result = await axios.get(endpoint)
  if (result.data["Global Quote"]) {
    let data = {
      symbol : result.data["Global Quote"]["01. symbol"],
      open : result.data["Global Quote"]["02. open"],
      high : result.data["Global Quote"]["03. high"],
      low : result.data["Global Quote"]["04. low"],
      price : result.data["Global Quote"]["05. price"],
      volume : result.data["Global Quote"]["06. volume"],
      last_trade_day : result.data["Global Quote"]['07. latest trading day'],
      prev_close : result.data["Global Quote"]['08. previous close'],
      change : result.data["Global Quote"]['09. change'],
      percent_change : result.data["Global Quote"]['10. change percent']
    }
    return data
  } else {
    return result.data
  }

}

// app.get('/', async (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// })

app.use('/', express.static(path.join(__dirname, "client")))

app.get('/finance/:symbol', async (req, res) =>{
  let symbol = req.params.symbol
  res.json(await fetchQuote(symbol))
})

server.listen(port, () => console.log(`Listening on port: ${port}`))

