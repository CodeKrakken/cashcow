import React from 'react';
import logo from './logo.svg';
import Price from './Components/Price'
import './App.css';

function App() {
  return (
    <div>
      <h1>Cash Cow - Mooooo</h1>
      <Price symbol={"aapl"}/>
      <Price symbol={"goog"}/>
    </div>
    
  );
}

export default App;
