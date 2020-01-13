import React from 'react';
import StockForm from './Components/StockForm'
import Price from './Components/Price'
import Graph from './Components/_Graph'
import NewsContainer from './Components/NewsContainer'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { symbol: "TSLA" }
  }

  render () {
    return (
      <div>
        <h1>Cash Cow - Mooooo</h1>
        <div>
          < StockForm />
        </div>
        <div>
          <Price symbol={this.state.symbol}/>
          <Graph symbol={this.state.symbol}/>
          <NewsContainer symbol={this.state.symbol}/>
        </div>
      </div>
    );
  }
}

export default App;
