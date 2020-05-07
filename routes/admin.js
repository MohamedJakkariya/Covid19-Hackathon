const express = require('express');
const router = express.Router();
bcrypt = require('bcryptjs'),
passport = require('passport'),

// Load User model
  Admin = require('../models/Admin'),
  manipulationAdmin = require('../db/manipulation-Admin'),
  Personal = require('../models/Personal'),
  Lab = require('../models/Lab'),
  Food = require('../models/Food'),
  Symptoms = require('../models/Symptoms'),
  Hospital = require('../models/Hospital'),
  Transport = require('../models/Transport'),
  Doctor = require('../models/Doctor'),
  User = require('../models/User');

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

// Logout route 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/admin/login');
});

// View application statistics of symptoms route 
router.get('/symptoms', (req, res) => {
  manipulationAdmin.getResults(res, Symptoms, 'application-dashboard', 'Symptoms');
});

// View application statistics of hospital route 
router.get('/hospital', (req, res) => {
  manipulationAdmin.getResults(res, Hospital, 'application-dashboard', 'Hospital');
});

// View application statistics of doctor route 
router.get('/doctor', (req, res) => {
  manipulationAdmin.getResults(res, Doctor, 'application-dashboard', 'Doctor');
});

// View application statistics of Food Needy route 
router.get('/food', (req, res) => {
  manipulationAdmin.getResults(res, Food, 'application-dashboard', 'Food');
});

// View application statistics of Transport Needy route 
router.get('/transport', (req, res) => {
  manipulationAdmin.getResults(res, Transport, 'application-dashboard', 'Transport');
});

// View application statistics of Personal Needy route 
router.get('/personal', (req, res) => {
  manipulationAdmin.getResults(res, Personal, 'application-dashboard', 'Personal');
});

// View application statistics of Lab Needy route 
router.get('/lab', (req, res) => {
  manipulationAdmin.getResults(res, Lab, 'application-dashboard', 'Lab');
});

// View application statistics of Volunteers list route 
router.get('/volunteers', (req, res) => {
  manipulationAdmin.getResults(res, User, 'application-dashboard', 'Volunteers');
});

module.exports = router;
