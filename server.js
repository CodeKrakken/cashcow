const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const DataFetcher = require('./models/DataFetcher')
const NewsFetcher = require('./models/NewsFetcher')
const Predictor = require('./models/Predictor')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const User = require('./models/User')
const Stock = require('./models/Stock')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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
  try {
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.create(username, firstName, lastName, email, password);
    if (user.username != null) {
      req.session.user = user
      jwt.sign({user : user}, 'moolians', {expiresIn: '30m'}, (err, token) => {
        res.status(200).json({ // return authentication object back to client
          user : user, 
          sessionId : req.session.id,
          token: token,
          message : "Sign Up Successful!"
        });
      })
    } else {
      res.status(401).send(user);
    }
  } catch (err) {
    res.status(401).send()
  }
  
});

app.post("/users/authenticate", async (req, res) => { 
  try {
    let user = await User.authenticate(req.body.email, req.body.password)
    if (user instanceof User) {
        jwt.sign({user : user}, 'moolians', {expiresIn : '30m'}, (err, token) => {
          res.status(200).json({
            user: user, 
            sessionId : req.session.id, 
            token : token,
            message : "Sign in Successful!"
          })
        })
    } else { 
      res.status(401).send('failed')
    } 
  } catch (err) {
      res.status(500).send("not a valid user")
  }
});

// Protected Route - Replace with route for portfolio
app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, 'moolians', (err, data) => {
    if(err) {
      res.sendStatus(403)
    } else (res.json({
      message : "This Route is protected",
       user : data.user,
    }))
  })
})

// MiddleWare for Protected Route
function verifyToken(req, res, next) {
  console.log("Verifying")
  const bearerHeader = req.headers['authorization'];
  if(bearerHeader != undefined) {
    const bearerToken = bearerHeader.split(" ")[1]
    req.token = bearerToken
    next()
  } else {
    console.log("Sending")
    res.sendStatus(403)
  }
}


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

// STOCKS
app.get('/api/stocks/:user', async (req, res) => {
  try {
    let userId = req.params.user
    console.log(req.params)
    let result = await Stock.findByUserId(userId)
    console.log("result :",result)
    res.status(200).send(result)
  } catch (err) {
    res.statusCode(400)
  }
})

app.post('/api/stocks/new', async(req, res) => {
  try {
    let symbol = req.body.symbol
    let amount = parseInt(req.body.amount)
    let userId = parseInt(req.body.userId)
    Stock.create(symbol, userId, amount)
  } catch (err) {
    console.log("Cannot Add")
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

// STOCKS



server.listen(port, () => console.log(`Listening on port: ${port}`))
