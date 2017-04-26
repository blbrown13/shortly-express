const utils = require('../lib/hashUtils.js');
const Model = require('./model');

// Write you user database model methods here
// code refactored after solution code review

class Users extends Model {
  constructor() {
    super('users');
  }

  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  }

  create({ username, password }) {
    let timestamp = Date.now();
    let salt = utils.createSalt(timestamp);

    let newUser = {
      username,
      salt,
      password: utils.createHash(password, salt)
    };

    return super.create.call(this, newUser);
  }
}

module.exports = new Users();


/************************************************************/
// code prior to solution demo
/************************************************************/

// class Users extends Model {
//   constructor() {
//     super('users');
//   }
//   // crypto to hash password
//   hashPassword(password) {
//     var hashedPW = utils.makeHash(password);
//     return hashedPW;
//   }
//
//   validateUserPassword(username, password) {
//     var hashed = Users.hashPassword(password);
//     console.log('validateUserPassword: ', hashed);
//   }
// }
