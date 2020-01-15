import React from 'react';
import StockForm from './Components/StockForm'
import Price from './Components/Price'
import Graph from './Components/Graph'
import NewsContainer from './Components/NewsContainer'
import Prediction from './Components/Prediction'
import CompanyDetails from './Components/CompanyDetails'
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
    this.setState({symbol: newSymbol})
  }

  render () {
    return (



      <div className="app-container">


      <Navbar className="color-nav" variant="light">
        <a href="#home" className="nav-link">Home</a>
        <a href="#home" className="nav-link">Sign up</a>
        <a href="#home" className="nav-link">Log in</a>
      </Navbar>


        <div className="top-bar">
          <div className="search-container">
            < StockForm
              symbol={this.state.symbol}
              onSymbolChange={this.handleSymbolChange} />
          </div>
          <div className="cashcow-logo">
          <img src={'../cashcowlogosmall.jpg'}/>
            CashCow
          </div>
        </div>

        <div className="main-container flex-item">
          <div className="app-left">
            <div className="price-details-container">
              <div className="symbol">
                {this.state.symbol}
              </div>
              <div className="price-details">
                <Price symbol={this.state.symbol}/>
              </div>
            </div>
            <div className="prediction-container flex-item">
              <Prediction symbol={this.state.symbol}/>
            </div>
            <div className="graph flex-item">
              <Graph symbol={this.state.symbol}/>
            </div>
          </div>
          <div className="app-right">
            <div className="company-details-container">
              <CompanyDetails symbol={this.state.symbol}/>
            </div>
            <div className="news flex-item">
              <NewsContainer symbol={this.state.symbol}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
