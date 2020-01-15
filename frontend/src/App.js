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
import Portfolio from './Components/Portfolio'
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
import './styles/PortfolioItem.css';


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
    console.log("res", res)
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
        <Link to="/register/">SignUp</Link>
      )
    }
  }

  loginLink = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated") // use JWT instead?
    console.log(isAuthenticated)
    if(isAuthenticated != true) {
      return(
        <Link to="/login/">Login</Link>
      )
    }
  }

  logoutLink = () => {
    // let isAuthenticated = sessionStorage.getItem("isAuthenticated") // doesnt work! NB Session storage clears on close tab
    // console.log(sessionStorage)
    // console.log(isAuthenticated)
    // if(isAuthenticated == "true") {
    //   return(
    //     <Link onClick={this.handleLogout}>Log Out</Link>
    //   )
    // }
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
      <h1>Welcome To CashCow {this.state.username}</h1>
        <Router>
          { this.signupLink() }
          { this.loginLink() }
          { this.logoutLink() }

          <Link to="/portfolio">Portfolio</Link>
          <Link to="/app">Main</Link>
          <Route path="/register" component={() => 
            <Register 
              authenticate={this.authenticate} 
              reject={this.reject}
            />}>
          </Route> 

          <Route path='/login'>
            <LoginForm authenticate={this.authenticate} reject={this.reject}/>
          </Route>

          <Route 
            path='/portfolio' 
            component={() => 
              <Portfolio userId={sessionStorage.userId}></Portfolio>
            }>
          </Route>
          
          <Route path="/app">
            <div>
              < StockForm
                symbol={this.state.symbol}
                onSymbolChange={this.handleSymbolChange} />
              < InvalidMessage flag={this.state.invalidFlag}/>
            </div>
            <div className="main-container flex-item">
              <div className="price-details-container">
                <Price symbol={this.state.symbol}/>
                <CompanyDetails symbol={this.state.symbol}/>
              </div>
              <div className="news flex-item"><NewsContainer symbol={this.state.symbol}/></div>
              <div className="graph flex-item"><Graph symbol={this.state.symbol}/></div>
              <div className="prediction-container flex-item"><Prediction symbol={this.state.symbol}/></div>
            </div>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
