var validateToken = require('../routes/auth.js').validateToken;

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (!token) {
    res.status(401);
    res.json({
      status: 401,
      message: 'Invalid Token or Key'
    });
    return;
  }

  try {
    // Authorize the user to see if s/he can access our resources
    if (validateToken(token)) {
      next(); // To move to next middleware
    } else {
      res.status(403);
      res.json({
        status: 403,
        message: 'Not Authorized'
      });
      return;
    }
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: 'Oops something went wrong',
      error: err
    });
  }
};