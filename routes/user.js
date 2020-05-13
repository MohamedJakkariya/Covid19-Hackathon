const manipulationUser = require('../db/manipulation-User');
const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  passport = require('passport'),
  // manipulationAdmin = require('../db/manipulation-Admin'),
  // crypto = require('crypto-random-string');
  // nodemailer = require('nodemailer');
    mail = require('../utils/sedingMail'),
  { ensureAuthenticated } = require('../config/auth');

// Load User model
User = require('../models/User');

// Login Page
router.get('/signup', (req, res) => res.render('signup'));

// Register
router.post('/signup', (req, res) => {
  let file;
  let profileName;
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
    address,
    aadhar
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
          address,
          type,
          aadhar,
          profile
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // Profile submit to verification
                mail.informToAdmin(newUser.email);

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
  passport.authenticate('local', {
    successRedirect: '/user-profile',
    failureRedirect: '/user/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});

// Apply stuff GET route
router.get('/sympotoms', (req, res) =>
  res.render('apply', {
    action: 'sympotoms',
    For: 'Inform for symptoms',
  })
);

router.get('/food', (req, res) =>
  res.render('apply', {
    action: 'food',
    For: 'Apply for food',
  })
);

router.get('/transport', (req, res) =>
  res.render('apply', {
    action: 'transport',
    For: 'Apply for Transport Pass',
  })
);

router.get('/personal', (req, res) =>
  res.render('apply', {
    action: 'personal',
    For: 'Apply for Personal Pass',
  })
);

router.get('/hospital', (req, res) =>
  res.render('apply', {
    action: 'hospital',
    For: 'Apply for hospital admission',
  })
);

router.get('/doctor', (req, res) =>
  res.render('apply', {
    action: 'doctor',
    For: 'Apply for doctor appointment',
  })
);

router.get('/lab', (req, res) =>
  res.render('apply', {
    action: 'lab',
    For: 'Apply for lab result',
  })
);

// Apply stuff POST route
router.post('/sympotoms', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToSymptoms(req, res);
});

router.post('/food', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToFood(req, res);
});

router.post('/transport', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToTransport(req, res);
});

router.post('/personal', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToPersonal(req, res);
});

router.post('/hospital', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataHospital(req, res);
});

router.post('/doctor', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToSymptoms(req, res);
});

router.post('/lab', (req, res) => {
  console.log(req.body);
  manipulationUser.insertDataToLab(req, res);
});

router.post('/volunteer', (req, res) => {
  console.log(req.body.volunteer);
  if (req.body.volunteer === 'false') {
    req.flash('error_msg', 'Not appreciated answer!');
    res.redirect('/user-profile');
  } else {
    manipulationUser.setVolunteer(req, res);
  }
});

router.post('/volunteer/:id', (req, res) => {
  console.log(req.params.id);
    manipulationUser.setVolunteer(req, res);  
}
);

// Forgot password route
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

// Sent password to that mail
router.post('/forgot-password', (req, res) => {
  manipulationUser.setResetToken(req, res);
});

// Get the link page
router.get('/password-reset/:token', function (req, res) {
  manipulationUser.getResetPasswordPage(req, res);
});

// Password change into db and confirmation email send to student
router.post('/password-reset/:token', function (req, res) {
  manipulationUser.setPasswordChange(req, res);
});

module.exports = router;
