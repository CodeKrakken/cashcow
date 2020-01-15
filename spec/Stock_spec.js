const Stock = require('../models/Stock')
const TestHelper = require('./TestHelper')
process.env.NODE_ENV = 'TEST'

describe('Stock', () => {
  beforeAll(async () => {
    let helper = new TestHelper()
    await helper.setupTestDb()
  })

  afterAll(async () => {
    let helper = new TestHelper()
    await helper.tearDownTestDb()
  })

  describe('.findByUserId', () => {
    it("returns [ { symbol: 'MSFT', amount: 2 },{ symbol: 'TSLA', amount: 3 },{ symbol: 'AAPL', amount: 3 } ] when passed in (1)", async () => {
      let result = await Stock.findByUserId(1)
      expect(result).toEqual([ 
        { symbol: 'MSFT', amount: 2 },
        { symbol: 'TSLA', amount: 3 },
        { symbol: 'AAPL', amount: 3 } 
      ])
    })
  })
})