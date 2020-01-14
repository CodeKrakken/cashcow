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
      <div class="app-container">
        <div class="top-bar">
          <div class="brand-container">
            <h1>CashCow</h1>
          </div>
          <div class="search-container">
            < StockForm
              symbol={this.state.symbol}
              onSymbolChange={this.handleSymbolChange} />
          </div>
        </div>

        <div class="main-container flex-item">
          <div class="app-left">
            <div class="price-details-container">
              <Price symbol={this.state.symbol}/>
            </div>
            <div class="prediction-container flex-item">
              <Prediction symbol={this.state.symbol}/>
            </div>
            <div class="graph flex-item">
              <Graph symbol={this.state.symbol}/>
            </div>
          </div>
          <div class="app-right">
            <div class="company-details-container">
              <CompanyDetails symbol={this.state.symbol}/>
            </div>
            <div class="news flex-item">
              <NewsContainer symbol={this.state.symbol}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
