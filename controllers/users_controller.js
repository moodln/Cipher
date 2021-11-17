const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

const registerUser = (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        // Otherwise create a new user
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
}

const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'This user does not exist'});
      }

      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {id: user.id, handle: user.handle};

          jwt.sign(
            payload,
            keys.secretOrKey,
            // Tell the key to expire in one hour
            {expiresIn: 3600},
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
        } else {
          return res.status(400).json({password: 'Incorrect password'});
        }
      })
    })
}

const currentUser = (req, res, next) => {
    
  return res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
}

const searchForUsersToInvite = (req, res) => {
  
  User.find({_id: {"$nin": req.headers.usersingroup}}, (err, users) => {
    
    const usersById = {};
    
    Object.values(users).forEach(user => {
      usersById[user.id] = user;
    });

    let allUsersId = Object.keys(usersById)
    res.json({usersById, allUsersId})
    
  });
}

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  searchForUsersToInvite
}