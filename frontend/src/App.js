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
      <div className="app-container">
        <h1>Welcome To CashCow</h1>
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
      </div>
    );
  }
}

export default App;
