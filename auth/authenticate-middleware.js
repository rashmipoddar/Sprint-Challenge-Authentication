/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = process.env.JWT_SECRET || 'This is a secret';

  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        console.log(err);
        res.status(401).send({message: 'Please provide correct credentials'});
      } else{
        req.token = decoded;
        // console.log(decoded);
        next();
      }
    });
  } else {
    res.status(400).send({message: 'Please provide credentials/token'});
  }
};
