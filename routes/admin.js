const express = require('express');
const router = express.Router();
bcrypt = require('bcryptjs'),
passport = require('passport'),
// Load User model
  Admin = require('../models/Admin'),
  Login = require('../models/User'),
  manipulationAdmin = require('../db/manipulation-Admin');

// Sign up Page
router.get('/signup', (req, res) =>
  res.render('admin-signup', {
    action: '/admin/signup',
  })
);

// Sign up post
router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  const action = '/admin/signup';

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render('admin-signup', {
      errors,
      action,
    });
  } else {
    Admin.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('admin-signup', {
          errors,
          name,
          email,
          password,
          password2,
          action,
        });
      } else {
        const type = 'Admin';
        const newUser = new Admin({
          name,
          email,
          password,
          type,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/admin/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login route
router.get('/login', (req, res) =>
  res.render('login', {
    action: '/admin/login',
  })
);

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/admin/login',
      failureFlash: true,
    })(req, res, next);
  });

module.exports = router;
