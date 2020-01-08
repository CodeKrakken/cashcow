const express = require("express")
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const app = express()
const server = require("http").createServer(app);
const path = require('path');
const axios = require("axios")

require('dotenv').config()

app.use(bodyParser.json())



// app.get('/', async (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// })

app.use('/', express.static(path.join(__dirname, "client")))

app.get('/finance/:symbol', async (req, res) =>{
  try {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.params)
    let symbol = req.params.symbol
    let result = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${process.env.API_KEY}&symbols=${symbol}`)
    res.json(result.data)
  } catch (err) {
    console.log(err)
  }

})

server.listen(port, () => console.log(`Listening on port: ${port}`))

