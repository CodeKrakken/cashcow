import React from 'react';
import Price from './Components/Price'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      symbols: ["aapl", "goog"]
    }
  }

  render () {
    return (
      <div>
        <h1>Cash Cow - Mooooo</h1>
        <div class="symbols">
        {this.state.symbols.map((symbol) => (
          <Price symbol={symbol}/>
        ))}
        </div>
      </div>
    );
  }
}

export default App;
