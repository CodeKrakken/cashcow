const dbConnection = require("./DbConnection");

class Stock {
  constructor(symbol, userId, amount) {
    this.symbol = symbol
    this.userId = userId
    this.amount = amount
  }

  static async findAll() {
    let db = new dbConnection();
    let result = await db.query(`SELECT * FROM stocks;`)
    return result.rows
  }

  static async create(symbol, userId, amount) {
    let db = new dbConnection()
    let result = await db.query(`
      INSERT INTO 
      stocks (symbol, user_id, amount) 
      VALUES ('${symbol}', ${userId}, ${amount})
      RETURNING *;
    `)
    result = result.rows[0]
    let stock = new Stock(result.symbol, result.user_id, result.amount)
    return stock
  }

  static async findByUserId(userId) {
    let db = new dbConnection();
    let result = await db.query(`
      SELECT symbol, amount FROM stocks 
      WHERE user_id=${userId}`)
    return result.rows
  }

  static async delete(symbol, userId) {
    let db = new dbConnection();
    let result = await db.query(`
      DELETE FROM stocks
      WHERE symbol='${symbol}' AND user_id=${userId};
    `)
    return result
  }

  static async update(symbol, userId, amount) {
    let db = new dbConnection()
    console.log("UPDATE")
    // let stocks = await db.query('SELECT * FROM stocks;')
    let result = await db.query(`
      UPDATE stocks
      SET symbol = '${symbol}', amount = ${amount}
      WHERE symbol = '${symbol}' AND user_id = ${userId};
    `)
    // console.log(result);
    return result
  }
}

module.exports = Stock;