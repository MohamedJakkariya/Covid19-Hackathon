const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  passport = require('passport');
  // manipulationUser = require('../db/manipulation-User'),
  // manipulationAdmin = require('../db/manipulation-Admin'),
  // crypto = require('crypto-random-string');
  // nodemailer = require('nodemailer');
//   mail = require('../utils/sedingMail'),
//   { } = require('../config/auth');

// Load User model
const User = require('../models/User');

// Login Page
router.get('/signup', (req, res) => res.render('signup'));

// Register
router.post('/signup', (req, res) => {
  let file;
  let profile;
  console.log(req.body);
  if (req.files != null) {
    file = req.files.profile_img;
    profile = file.name;

    console.log(file);
    console.log(profile);

    // Check type of the image
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // Store images to server
      file.mv('public/img/uploaded_images/' + file.name, function (err) {
        if (err) {
          console.log('Something went wrong when the insert!');
          errors.push({
            msg: 'Something went wrong to store the image onto the server',
          });
        }
      });
    } else {
      errors.push({
        msg:
          "This image format is not allowed , please upload file with '.png','.jpg'",
      });
    }
  }

  const {
    fullname,
    email,
    password,
    password2,
    gender,
    mobile,
    dob,
    age,
    nationality,
    state,
    district,
  } = req.body;
  let errors = [];

  if (!fullname || !email || !password || !password2) {
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
    res.render('signup', {
      errors,
    });
  } else {
    // Store data on to the database
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        const action = '/user/login';
        res.render('signup', {
          errors,
          fullname,
          email,
          password,
          password2,
          action,
        });
      } else {
        const type = 'User';

        const newUser = new User({
          fullname,
          email,
          password,
          password2,
          gender,
          mobile,
          dob,
          age,
          nationality,
          state,
          district,
          type
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // Profile submit to verification
                // mail.informToAdmin(newUser.email);
                
                req.flash(
                  'success_msg',
                  'Your profile is created and submitted to admin for verification! \n Go to Login...'
                );

                return res.redirect('/user/login');
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
    action: '/user/login',
  })
);

// Login
router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/user-profile',
    failureRedirect: '/user/login',
    failureFlash: true,
  })(req, res, next);
});
 
// Apply stuff GET route
router.get('/sympotoms', (req, res) =>
  res.render('apply', {
    action: '/user/symptoms',
    For: 'Inform for symptoms'
  })
);

router.get('/food', (req, res) =>
  res.render('apply', {
    action: '/user/food',
    For: 'Apply for food'
  })
);

// Apply stuff POST route
router.post('/sympotoms', (req, res) => {
  console.log(req.body);
  res.send('sussessfuly posted');
  }
);

router.post('/food', (req, res) =>{
  console.log(req.body);
  res.send('sussessfuly posted');
  }
);

module.exports = router;
