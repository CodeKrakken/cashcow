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
import LoginMessage from './Components/LoginMessage'
import Portfolio from './Components/Portfolio'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import './styles/App.css';
import './styles/CompanyDetails.css';
import './styles/Chart.css';
import './styles/NewsContainer.css';
import './styles/Price.css';
import './styles/StockForm.css';
import './styles/Portfolio.css';
import './styles/Register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.state = { 
      symbol: "TSLA",
      isAuth: localStorage.getItem("isAuth")
    }
  }

  componentDidMount() {
    console.log(localStorage)
    const isAuth = localStorage.getItem("isAuth")
    console.log(isAuth)
    this.setState({isAuth: (localStorage.getItem('isAuth') == 'true')})
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
    localStorage.setItem("userId", res.user.id)
    localStorage.setItem("sessiondId", res.sessionId)
    localStorage.setItem("username", res.user.username)
    localStorage.setItem("token", res.token)
    localStorage.setItem("isAuth", true)
    this.setState({isAuth : true})
    this.setState({user : res.user.username})
    this.setState({isRejected : false})
    this.setState({message : res.message})
    this.setState({didLogin : true})
  }

  // render links based on login
  signupLink = () => {
    let isAuth = this.state.isAuth
    if(!isAuth) {
      return(
        <Link className="nav-link" to="/register/">Sign Up</Link>
      )
    }
  }

  loginLink = () => {
    let isAuth = this.state.isAuth
    if(isAuth != true) {
      return(
        <Link className="nav-link" to="/login/">Login</Link>
      )
    }
  }

  logoutLink = () => {
    let isAuth = this.state.isAuth
    if(isAuth) {
      return(
        <Link className="nav-link" onClick={this.handleLogout} to="/">Log Out</Link>
      )
    }
  }

  portfolioLink = () => {
    let isAuth = this.state.isAuth
    if(isAuth) {
      return(
        <Link className="nav-link" to="/portfolio">Portfolio</Link>
      )
    }
  }

  handleLogout = () => {
    localStorage.clear()
    localStorage.setItem('isAuth', false)
    this.setState({isAuth : false})
  }

  reject = (res) => {
    this.setState({isRejected : true})
    this.setState({didLogin : false})
    this.setState({message : res.message})
  }

  setWebsite = (url) => {
    this.setState({website: url});
  }

  render () {
    return (
      <div className="app-container">
        <Router>
          <Navbar className="color-nav" variant="light">
              <Link className="nav-link" to="/">Home</Link>
              { this.signupLink() }
              { this.loginLink() }
              { this.logoutLink() }
              { this.portfolioLink() }
          </Navbar>

          <Route path="/register" component={() =>
            <div>
              <Register
                authenticate={this.authenticate}
                reject={this.reject}
              />
              <LoginMessage 
                message={this.state.message} 
                isRejected={this.state.isRejected} 
                didLogin={this.state.didLogin}/>
            </div>
          }>
          </Route>

          <Route path='/login' component={() => 
            <div>
              <LoginForm authenticate={this.authenticate} reject={this.reject}/>
              <LoginMessage message={this.state.message} isRejected={this.state.isRejected} didLogin={this.state.didLogin}/>
            </div>
          }>
          </Route>

          <Route 
            path='/portfolio' 
            component={() => 
              <Portfolio userId={localStorage.userId}></Portfolio>
            }>
          </Route>

          <Switch>
            <Route exact path="/">
              <div className="cashcow-logo-container">
                <div className="cashcow-logo">
                  <img src={'../cashcowlogosmall.jpg'}/>
                </div>
              </div>
              <div className="search-container">
                < StockForm
                  symbol={this.state.symbol}
                  onSymbolChange={this.handleSymbolChange} />
                < InvalidMessage flag={this.state.invalidFlag}/>
              </div>

              <div className="main-container flex-item">
                <div className="app-top">
                  <div className="finance-info">
                    <img className="company-logo" src={`//logo.clearbit.com/${this.state.website}`}></img>
                    <div className="symbol">
                      {this.state.symbol}
                    </div>
                    <div className="price-details">
                      <Price symbol={this.state.symbol}/>
                    </div>
                    <div className="prediction-container">
                      <Prediction symbol={this.state.symbol}/>
                    </div>
                  </div>
                  <div className="graph-container">
                    <Graph className="graph" symbol={this.state.symbol}/>
                  </div>
                </div>

                <div className="app-middle">
                  <div className="company-details-container">
                    <CompanyDetails setWebsite={this.setWebsite} symbol={this.state.symbol}/>
                  </div>
                </div>

                <div className="app-bottom">
                  <div className="news flex-item">
                    <NewsContainer symbol={this.state.symbol}/>
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
