const fs = require('fs')
const Predictor = require('../models/Predictor')

describe("Predictor", () => {
  let parsedDummy = 
      [ { date: new Date("2020-01-08T00:00:00.000Z"),
        high: '303.2300',
        low: '297.1560',
        open: '297.1600',
        close: '302.7100',
        volume: '22192266' },
      { date: new Date("2020-01-07T00:00:00.000Z"),
        high: '300.9000',
        low: '297.4800',
        open: '299.8400',
        close: '298.3900',
        volume: '26221027' },
      { date: new Date("2020-01-06T00:00:00.000Z"),
        high: '299.9600',
        low: '292.7500',
        open: '293.7900',
        close: '299.8000',
        volume: '29644644' } ]

  it('Returns the 302.71 using parsedDummy and a size of 1', () => {
    let movingAvergae = Predictor.movingAverage(parsedDummy, 1)
    expect(movingAvergae).toEqual(302.71)
  })

  it('Returns 300.55 using parsedDummy and a size of 2', () => {
    let movingAvergae = Predictor.movingAverage(parsedDummy, 2)
    expect(movingAvergae).toEqual(300.55)
  })

  it('Returns 300.3 using parsedDummy and a size of 3', () => {
    let movingAvergae = Predictor.movingAverage(parsedDummy, 2)
    expect(movingAvergae).toEqual(300.55)
  })
})