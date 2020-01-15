const dbConnection = require("./DbConnection");
const bcrypt = require('bcrypt')

class User {
  constructor(username, id, first, last) {
    this.username = username;
    this.id = id;
    this.first = first;
    this.last = last;
  }

  static async find(id) {
    let db = new dbConnection();
    let result = await db.query(`SELECT * FROM users WHERE id=${id}`);
    return result.rows;
  }

  static async findByEmail(email) {
    let db = new dbConnection();
    let result = await db.query(`SELECT * FROM users WHERE email='${email}'`);
    // console.log(result.rows)
    return result.rows[0];
  }

  static async check_exists(email) {
    let user = await this.findByEmail(email);
    return !!user;
  }

  static async create(username, first, last, email, password) {
    let exists = await this.check_exists(email);
    if (exists) {
      return "user already exists";
    } else {
      let db = new dbConnection();
      let hashedPassword = await bcrypt.hash(password, 10)
      let result = await db.query(`
        INSERT INTO 
        users (username, first, last, email, password) 
        VALUES ('${username}', '${first}', '${last}', '${email}', '${hashedPassword}')
        RETURNING *;
      `);
      let rows = result.rows;
      
      return new User(
        rows[0].username,
        rows[0].id,
        rows[0].first,
        rows[0].last
      );
    }
  }

  static async authenticate(email, password) {
    let user = await this.findByEmail(email); // get user data
    if (user) {
      let isPassword = await bcrypt.compare(password, user.password)
      if (isPassword) {
        return new User(user.username, user.id, user.first, user.last);
      } else {
        return "Email or Password Incorrect";
      }
    }
  }
}

module.exports = User;
