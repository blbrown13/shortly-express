const utils = require('../lib/hashUtils');
const Model = require('./model');
// crypto

class Users extends Model {
  constructor() {
    super('users');
  }

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
}

module.exports = new Users();

// class Links extends Model {

// Model.create(){}

// create(options) {
//   let queryString = `INSERT INTO ${this.tablename} SET ?`;
//   return executeQuery(queryString, options);
// }

// get: function(){},
// post: function (options, cb) {
//   console.log('inside user post!')
//   var user = options.json.username;
//   var password = options.json.password;
//   console.log('USER: ', user, 'PASSWORD: ', password);
//   var dbString = 'INSERT INTO users (username, password) VALUES (?, ?)';
//   db.query(dbString, function(err, results) {
//     cb(err, results);
//   });
// }
