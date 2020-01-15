import React from 'react';
import StockForm from './Components/StockForm'
import Price from './Components/Price'
import Graph from './Components/Graph'
import NewsContainer from './Components/NewsContainer'
import Prediction from './Components/Prediction'
import CompanyDetails from './Components/CompanyDetails'
import Register from './Components/Register'
import SymbolValidator from './symbolValidator.js'
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


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.state = { symbol: "TSLA" }
  }

  handleSymbolChange(newSymbol) {
    if (SymbolValidator.validate(newSymbol).valid) {
      this.setState({symbol: newSymbol})
    } else {
      alert(newSymbol)
    }
    // if (this.handleSymbolValidation(newSymbol)) {
    // } else {
      // alert(this.state.error);
    // }
  }

  handleSymbolValidation(symbol) {
    let symbolIsValid;
    let error;
    if(symbol === "MSFT") {
      symbolIsValid = true;
      error = false;
    } else {
      symbolIsValid = false;
      error = 'invalid symbol';
    }
    this.setState({error: error});
    return symbolIsValid;
  }

  authenticate = (res) => {
    sessionStorage.setItem("userId", res.user.id)
    sessionStorage.setItem("sessiondId", res.sessionId)
    sessionStorage.setItem("username", res.user.username)
    sessionStorage.setItem("isAuthenticated,", true)
    this.setState({isRejected : false})
  }

  signupLink = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated")
    console.log("authenticated", isAuthenticated)
    if(isAuthenticated != "true") {
      return(
        <Link to="/register/">SignUp</Link>
      )
    }
  }

  handleRejection = () => {
    if (this.state.isRejected) {
      return(
        <h1>Signup / Login Failed</h1>
      )
    }
  }

  reject = (res) => {
    this.setState({isRejected : true})
    console.log(res)
  }

  render () {
    return (
      <div className="app-container">
        { this.handleRejection() }
        <h1>Welcome To CashCow</h1>
        <Router>

          { this.signupLink() }
          <Route path="/register" component={() => 
            <Register 
              authenticate={this.authenticate} 
              reject={this.reject}
            />}>
          </Route> 
          <div>
            < StockForm
              symbol={this.state.symbol}
              onSymbolChange={this.handleSymbolChange} />
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
        </Router>
      </div>
    );
  }
}

export default App;
