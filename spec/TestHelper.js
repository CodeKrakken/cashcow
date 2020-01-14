const DbConnection = require('../models/DbConnection')
const fs = require('fs')
cwd = process.cwd()

class TestHelper {
  constructor() {
    this.createTableUsersQuery = fs.readFileSync(`${cwd}/db/migrations/02_CREATE_TABLE_USERS.sql`).toString()
    this.createTableStocksQuery = fs.readFileSync(`${cwd}/db/migrations/03_CREATE_TABLE_STOCKS.sql`).toString()
    this.createTableFriendsQuery = fs.readFileSync(`${cwd}/db/migrations/04_CREATE_TABLE_FRIENDS.sql`).toString()
    this.insertIntoUsersQuery = fs.readFileSync(`${cwd}/db/migrations/05_INSERT_INTO_USERS.sql`).toString()
    this.insertIntoStocksQuery = fs.readFileSync(`${cwd}/db/migrations/06_INSERT_INTO_STOCKS.sql`).toString()
  }

  async createTableUsers() {
    try {
      let db = new DbConnection()
      let result = await db.query(this.createTableUsersQuery)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async createTableStocks() {
    try {
      let db = new DbConnection()
      let result = await db.query(this.createTableStocksQuery)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async populateUsersTable() {
    try {
      let db = new DbConnection()
      let result = await db.query(this.insertIntoUsersQuery)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async populateStocksTable() {
    try {
      let db = new DbConnection()
      let result = await db.query(this.insertIntoStocksQuery)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  async dropTable(tableName) {
    try {
      let db = new DbConnection()
      await db.query(`DROP TABLE ${tableName};`)
    } catch (err){
      console.error(err)
    }
  }

  async setupTestDb() {
    try {
      await this.createTableUsers()
      await this.createTableStocks()
      await this.populateUsersTable()
      await this.populateStocksTable()
      return "SETUP"
    } catch (err) {
      console.log(err)
    } 
  }

  async tearDownTestDb() {
    try {
      await this.dropTable('stocks')
      await this.dropTable('users')
      return "TEAR DOWN"
    } catch (err) {
    }
  }
}

module.exports = TestHelper