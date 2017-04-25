const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

module.exports.makeHash = function(password) {
  const secret = password;
  const hash = crypto.createHmac('sha256', secret)
                      .update('I love cupcakes')
                      .digest('hex');
  return hash;
}
