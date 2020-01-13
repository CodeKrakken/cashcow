import React from 'react';
import Price from './Components/Price'
import Graph from './Components/Graph'
import NewsContainer from './Components/NewsContainer'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symbols: ["TSLA"]
    }
  }

  render () {
    return (
      <div>
        <h1>Welcome To CashCow</h1>
        <div>
          {this.state.symbols.map((symbol) => (
            <div className="app">
              <Price symbol={symbol}/>
              <Graph symbol={symbol}/>
              <NewsContainer symbol={symbol}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
