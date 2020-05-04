const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  passport = require('passport'),
  manipulationUser = require('../db/manipulation-User'),
  manipulationAdmin = require('../db/manipulation-Admin'),
  crypto = require('crypto-random-string'),
  nodemailer = require('nodemailer');
//   mail = require('../utils/sedingMail'),
//   { } = require('../config/auth');

// Load User model
const User = require('../models/User');

// Login Page
router.get('/signup', (req, res) => res.render('signup'));

// Login route 
router.get('/login', (req, res) =>
  res.render('login', {
    action: '/user/login',
  })
);

module.exports = router;
