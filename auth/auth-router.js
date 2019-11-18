const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth-model');

router.post('/register', validateUserData, (req, res) => {
  // implement registration
  const userData = req.body;
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  userData.password = hashedPassword;

  Auth.addUser(userData)
    .then(user => {
      const token = createToken(user);
      user.token = token;
      res.status(201).send(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The user could not be registered'});
    })
});

router.post('/login', validateUserData, (req, res) => {
  // implement login
  const { username, password } = req.body;

  Auth.findUserBy({username})
    .first()
    .then(user => {
      // console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        user.token = token;
        delete user.password;
        res.status(200).send(user);
      } else {
        res.status(401).send({message: 'Please provide correct credentials'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error in the database. Try again.'});
    })
});

function validateUserData(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({message: 'Username and password are required'});
  } else {
    next();
  }
};

function createToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET || 'This is a secret';

  const options = {
    expiresIn: '1hr'
  }

  return jwt.sign(payload, secret, options);

};

module.exports = router;
