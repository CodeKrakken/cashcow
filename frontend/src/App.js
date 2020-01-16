import React from 'react';
import Axios from "axios";
import StockForm from './Components/StockForm'
import InvalidMessage from './Components/InvalidMessage'
import Price from './Components/Price'
import Graph from './Components/Graph'
import NewsContainer from './Components/NewsContainer'
import Prediction from './Components/Prediction'
import CompanyDetails from './Components/CompanyDetails'
import Register from './Components/Register'
import LoginForm from './Components/LoginForm'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import './styles/App.css';
import './styles/CompanyDetails.css';
import './styles/Chart.css';
import './styles/NewsContainer.css';
import './styles/Price.css';
import './styles/StockForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.state = { symbol: "TSLA" }
  }

  handleSymbolChange(newSymbol) {
    Axios.get(`/api/finance/${newSymbol}`)
    .then(res => {
      const result = res.data
      if (result['symbol']) {
        this.setState({invalidFlag: 0});
        this.setState({symbol: newSymbol})
      } else {
        this.setState({invalidFlag: 1});
      }
    })
  }

  authenticate = (res) => { // check how to set multiple items at once .. Destructuring?
    sessionStorage.setItem("userId", res.user.id)
    sessionStorage.setItem("sessiondId", res.sessionId)
    sessionStorage.setItem("username", res.user.username)
    sessionStorage.setItem("token", res.token)
    sessionStorage.setItem("isAuthenticated,", true)
    this.setState({user : res.user.username})
    console.log(res)
    this.setState({isRejected : false})
    this.setState({message : res.message})
    this.setState({didLogin : true})
  }

  // render links based on login
  signupLink = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated")
    if(isAuthenticated != true) {
      return(
        <Link className="nav-link" to="/register/">SignUp</Link>
      )
    }
  }

  loginLink = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated") // use JWT instead?
    console.log(isAuthenticated)
    if(isAuthenticated != true) {
      return(
        <Link className="nav-link" to="/login/">Login</Link>
      )
    }
  }

  logoutLink = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated") // doesnt work! NB Session storage clears on close tab
    console.log(sessionStorage)
    console.log(isAuthenticated)
    if(isAuthenticated == "true") {
      return(
        <Link className="nav-link" onClick={this.handleLogout}>Log Out</Link>
      )
    }
  }

  handleLogout = () => {
    sessionStorage.clear()
  }

  appendFailMessage = (event) => {
    if (this.state.isRejected && !this.state.didLogin) {
      return(
        <h1>Sign Up/ Login Failed</h1>
      )
    }
  }

  appendSuccessMessage = (message) => {
    if (this.state.didLogin && !this.state.isRejected) {
      return(
        <h1>{message}</h1>
      )
    } else {
      return
    }
  }

  reject = (res) => {
    this.setState({isRejected : true})
    this.setState({didLogin : false})
  }

  render () {
    return (
      <div className="app-container">
        { this.appendFailMessage(this.state.message) }
        { this.appendSuccessMessage(this.state.message) }
        <Router>

        <Navbar className="color-nav" variant="light">

            <Link className="nav-link" to="/">Home</Link>
            { this.signupLink() }
            { this.loginLink() }
            { this.logoutLink() }

        </Navbar>
          <Route path="/register" component={() =>
            <Register
              authenticate={this.authenticate}
              reject={this.reject}
            />}>
          </Route>

          <Route path='/login'>
            <LoginForm authenticate={this.authenticate} reject={this.reject}/>
          </Route>

          <Route path="/">

          <div className="row1">
            <div className="cashcow-logo">
              <img src={'../cashcowlogosmall.jpg'}/>
              CashCow
            </div>
            <div className="price-details-container">
              <div className="symbol">

              </div>
              <div className="price-details">
              {this.state.symbol}
                <Price symbol={this.state.symbol}/>
              </div>
              <div className="prediction-container flex-item">
                <Prediction symbol={this.state.symbol}/>
              </div>
            </div>
            <div className="search-container">
              < StockForm
                symbol={this.state.symbol}
                onSymbolChange={this.handleSymbolChange} />
              < InvalidMessage flag={this.state.invalidFlag}/>
            </div>
          </div>

          <div className="row2">
          <div className="graph flex-item">
            <Graph symbol={this.state.symbol}/>
          </div>
          <div className="company-details-container">
            <CompanyDetails symbol={this.state.symbol}/>
          </div>


          </div>


          <div className="row3">


            <div className="news flex-item">
              <NewsContainer symbol={this.state.symbol}/>
            </div>

          </div>

          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
