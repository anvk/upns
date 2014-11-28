var auth = {

  validateToken: function(token) {
    return require('../config/secret')() == token;
  }
}

module.exports = auth;