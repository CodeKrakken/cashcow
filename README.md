# CashCow

Multipurpose stock market tracker.

<br><br>

## Setup
```
git clone https://github.com/CodeKrakken/cashcow.git
npm install
```

<br><br>

## Usage

When the user visits the page, they can search by stock market symbol (eg TSLA). The app then presents the stock's value over the past 50 days, company information and company news. The last 7 days' data is displayed as a graph. Our analyser component compares the current value to the average value of the last 50 days and recommends Buy, Sell or Stick. Registered users can add stocks to a portfolio page that tracks their value and displays the user's total wealth.

<br><br>

## Development

* Built with Node; routed with Express

* PostgreSQL handles data for stocks and user accounts

* Frontend built with React; styled with Bootstrap and Flexbox

* Continuously integrated with Travis; deployed with Heroku

* Stock values retrieved from Alphavantage API

* Company information from IEX API

* Company news from Google News API

* D3 handles the graph display

<br><br>

## Testing

To run tests
` npm test` or `jasmine`

<br><br>

## Created by:

* [Donald](https://github.com/CodeKrakken)
* [Amy](https://github.com/amybalmforth)
* [Robert](https://github.com/bibbycodes)
* [Emma](https://github.com/emmavanoss)
