const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const axios = require('axios')
const DataFetcher = require('./models/DataFetcher')
const NewsFetcher = require('./models/NewsFetcher')
const Predictor = require('./models/Predictor')
const cookieParser = require('cookie-parser')
const fs = require("fs")
const session = require('express-session')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret : 'moolians',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge : 60000}
}))

if (process.env.NODE_ENV == 'development') {
  app.use('/', express.static(path.join(__dirname, 'frontend/public')))
} else if (process.env.NODE_ENV == 'production') {
  app.use('/', express.static(path.join(__dirname, 'frontend/build')))
}

// USERS
app.post("/users/register", async (req, res) => {
  let username = req.body.username;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.create(username, firstName, lastName, email, password);
  console.log(user)
  if (user.username != null) {
    req.session.user = user
    res.status(200).json({ user : user, sessionId : req.session.id });
  } else {
    res.status(401).send(user);
  }
});

app.post("/users/authenticate", async (req, res) => {
  console.log(req.body)
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.authenticate(email, password);
  console.log(user)
  if (user instanceof User) {
    res.status(200).json({ user: user });
  } else {
    res.status(401);
  }

  // jwt.sign({user : user}, 'moolians', (err, token) => {
  //   res.json({
  //     token : token
  //   })
  // })
});


// ROOT
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
    if (process.env.NODE_ENV == 'development') {
      res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
    } else if (process.env.NODE_ENV == 'production') {
      res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
    }
  } catch (err) {
    console.log(err)
  }
})

// FINANCE
app.get('/api/finance/:symbol', async (req, res) =>{
  try {
    let symbol = req.params.symbol
    res.json(await DataFetcher.fetchQuote(symbol))
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/week/:symbol', async (req, res) => {
  try {
    let symbol = req.params.symbol
    let timeSeries = await DataFetcher.fetchTimeSeriesDaily(symbol, 7)
    res.json(timeSeries)
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/prediction/:symbol', async (req, res) => {
  try {
    let symbol = req.params.symbol
    let data = await DataFetcher.fetchTimeSeriesDaily(symbol, 50)
    let movingAverage = Predictor.movingAverage(data)
    res.send(movingAverage)
  } catch (err) {
    console.log(err)
  }
})

// IEX
app.get('/api/company/:symbol', async (req, res) => {
  try {
    let symbol = req.params.symbol
    let details = await DataFetcher.fetchCompanyDetails(symbol)
    res.status(200).json(details)
  } catch (err) {
    console.log(err)
  }
})


// NEWS
app.get('/api/news/:symbol', async (req, res) => {
  try {
    let symbol = req.params.symbol
    let details = await DataFetcher.fetchCompanyDetails(symbol)
    let name = DataFetcher.getEncodedName(details)
    let result = await NewsFetcher.fetchArticles(name)
    let articles = NewsFetcher.parseArticles(result.articles)
    res.status(200).send(articles)
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
})

// ERROR?

app.get('*', (req, res) => {
  try {
    if (process.env.NODE_ENV == 'development') {
      res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
    } else if (process.env.NODE_ENV == 'production') {
      res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
    }
  } catch (err) {
    console.log(err)
  }
})

server.listen(port, () => console.log(`Listening on port: ${port}`))
