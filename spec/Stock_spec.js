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

  describe('.create', () => {
    it('adds returns an instance of stock', async () => {
      let stock = await Stock.create('AAPL', 1, 2)
      expect(stock instanceof Stock).toBe(true)
    })
  })

  describe('.delete', () => {
    it('deletes a stock from stocks', async () => {
      let command =  await Stock.delete('AAPL', 1)
      expect(command).toEqual("DELETE")
    })
  })

  describe('.update', () => {
    it('changes a record in the database', async() => {
      let newAmount = 3
      Stock.update("MSFT", 2, newAmount).then( async res => {
        let newRecord = await Stock.findByUserId(2) 
        expect(newRecord.amount).toEqual(3)
        expect(res.command).toEqual("UPDATE")
        // console.log(newRecord)
      })
    })
  })
  
})