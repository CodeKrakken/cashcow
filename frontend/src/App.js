import React from 'react';
import Price from './Components/Price'
import Graph from './Components/Graph'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symbols: ["googl"]
    }
  }

  render () {
    return (
      <div>
        <h1>Cash Cow - Mooooo</h1>
        <div>
          {this.state.symbols.map((symbol) => (
            <div>
              <Price symbol={symbol}/>
              <Graph symbol={symbol}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
