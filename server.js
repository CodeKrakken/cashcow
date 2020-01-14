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
    let hashedPassword = await bcrypt.hash(password, 10)
    let user = await User.create(username, firstName, lastName, email, hashedPassword);
    if (user.username != null) {
      req.session.user = user
      res.status(200).json({ user : user, sessionId : req.session.id });
    } else {
      res.status(401).send(user);
    }
  } catch (err) {

  }
  
});

app.post("/users/authenticate", async (req, res) => { 
  let user = await User.findByEmail(req.body.email); // get user data
  if (user) {
    // Use JWT, user must login again to get a new token
    try {
      let isPassword = await bcrypt.compare(req.body.password, user.password) // decrypt
      if (isPassword) { // extract this if clause into function?
        jwt.sign({user : user}, 'moolians', {expiresIn : '30m'}, (err, token) => {
          res.status(200).json({
            user: user, 
            sessionId : req.session.id, 
            token : token,
            message : "Sign in Successful!"
          })
        })
      }
    } catch (err) {
      res.status(500).send("Failed")
    }
  } else {
    res.status(401);
  }
});

// Protected Route - Replace with route for portfolio
app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, 'moolians', (err, data) => {
    if(err) {
      res.sendStatus(403)
    } else (res.json({
      message : "This Route is rotected",
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
