const crypto = require('crypto');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { multiArgs: true });
const utils = require('../lib/hashUtils.js');
const Model = require('./model');

class Users extends Model {
  constructor() {
    super('users');
  }
  // crypto to hash password
  hashPassword(password) {
    var hashedPW = utils.makeHash(password);
    return hashedPW;
  }
}

module.exports = new Users();



// createUserName(user, cb) {
//   var dbString = `INSERT INTO users (username) VALUES ("${user}")`;
//   // db.query(dbString, cb);
//   create(options) {
//     let queryString = `INSERT INTO ${this.tablename} SET ?`;
//     return executeQuery(queryString, options);
//   }
// }

// createUserPassword(password, cb) {
//   var dbString = `INSERT INTO users (password) VALUES ("${password}")`;
//   db.query(dbString, cb);
// }
