const db = require('../db/index.js');
const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here
// module.exports = {
//   createUser: {
//
//   }
// };

class Users extends Model {
  constructor() {
    super('users');
  }

  create(options) {
    db.query(options, function(err, results) {
      cb(err, results);
    });
  }
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
