const Personal = require('../models/Personal'),
  Lab = require('../models/Lab'),
  Food = require('../models/Food'),
  Symptoms = require('../models/Symptoms'),
  Hospital = require('../models/Hospital'),
  Transport = require('../models/Transport'),
  Doctor = require('../models/Doctor'),
  Toll = require('../models/Toll'),
  User = require('../models/User'),
  Chat = require('../models/Chat'),
  crypto = require('crypto-random-string'),
  nodemailer = require('nodemailer');

exports.insertDataToFood = (req, res) => {
  const { name, mobile, age, currentAddress, foodmembers, foodlist } = req.body;
    const isCheck = true;
    const newData = new Food({
      name,
      mobile,
      age,
      currentAddress,
      isCheck,
      foodmembers,
      foodlist,
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};

exports.insertDataToTransport= (req, res) => {
  const { name, mobile, age, currentAddress, transportMonth, transportType } = req.body;

    const isCheck = true;
    const newData = new Transport({
      name,
      mobile,
      age,
      currentAddress,
      isCheck,
      transportMonth,
      transportType
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};

exports.insertDataToSymptoms= (req, res) => {
  console.log(req.body);
  
  const { name, mobile, age, currentAddress, symptomName, days,tablets,hospitalName,hospitalGo } = req.body;

    const newData = new Symptoms({
      name,
      mobile,
      age,
      address:currentAddress,
      days,
      tablets,
      hospitalName,
      symptomName,
      hospitalGo
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};

exports.insertDataToPersonal= (req, res) => {
  const { name, mobile, age, currentAddress,  } = req.body;

    const isCheck = false;
    const newData = new Personal({
      name,
      mobile,
      age,
      currentAddress
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};

exports.insertDataHospital= (req, res) => { 
  let file;
  let profile;
  let errors = [];
  if (req.files != null) {
    file = req.files.medicalSheet;
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

  const { name, mobile, age, currentAddress,hospitalName,hospitalAddress  } = req.body;

  if(errors.length > 0){
    console.log(errors);
    res.render('apply', {
      action: 'hospital',
      For: 'Apply for Hospital admisstion',
      errors
    })
  }else{
    const isCheck = true;
    const newData = new Hospital({
      name,
      mobile,
      age,
      address:currentAddress,
      hospitalName,
      hospitalAddress,
      isCheck
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
  }
};


exports.insertDataToDoctor= (req, res) => {
  const { name, mobile, age, currentAddress, symptomName, days,tablets,hospitalName } = req.body;

    const isCheck = true;
    const newData = new Doctor({
      name,
      mobile,
      age,
      currentAddress,
      isCheck,
      days,
      tablets,
      hospitalName
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};


exports.insertDataToLab= (req, res) => {
  const { name, mobile, age, currentAddress,  } = req.body;

    const isCheck = false;
    const newData = new Lab({
      name,
      mobile,
      age,
      currentAddress
    });

    newData
      .save()
      .then((user) => {
        // Profile submit to verification
        // mail.informToAdmin(newData.email);

        req.flash('success_msg', 'Your application was submitted!');

        return res.redirect('/user-profile');
      })
      .catch((err) => console.log(err));
};


// Set isVolunteer of location 
exports.setVolunteer = (req, res) => {
  let data = '';
    
    // `doc` is the document _before_ `update` was applied
    User.findById(req.params.id, (err, doc) => {
      if (err) {
        data = 'error';
        res.send(JSON.stringify(data));
      }

      // Check Verified user 
      if(doc.isVerified){
        // check not a volunteer 
        if(!doc.isVolunteer){
          data = 'success';

          doc.isVolunteer = true;
          doc.lat = req.body.latitude;
          doc.lang = req.body.longitude;

          console.log(doc);
          
          doc.save(() => {
            res.send(JSON.stringify(data));
          });
        }else{
          // check already volunteer 
          data = 'override';
          res.send(JSON.stringify(data));
        }
      }else{
        // check not Verified 
        data = 'notverified';
        res.send(JSON.stringify(data));
      }
    });
};

exports.getTollList = async (req, res) => {
  await Toll.find({},  (err, tolldocs) => {
    if(err) console.log(err);

      // Store all chats into Array;
      let allChats;
      // //   Finding all preivous chats
      Chat.find({}, (err, docs) => {
        if (err) throw err;
        allChats = docs.map(m => m);

        res.render('user-panel', {
          Id: req.user._id,
          profile: req.user.profile,
          userName: req.user.fullname,
          numberlist: tolldocs,
          chatMsg: allChats
        });
      });
  });
}

// To update the password 
exports.updatePassword = (req, res) => {
  let errors = []; 

  const { password, password2 } = req.body;
  // Check they give password or not
  if (!password || !password2) {
    errors.push({ msg: 'Fill all the fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render('account-details', {
      errors,
      user: req.user
    });
  } else {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        console.log(hash);
        
        if (err) throw err;
        Login.findOne({ id : req.body.id },(err, doc) => {
          if(err){
            req.flash(
              'error_msg',
              "Your account details doen't updated"
              );
              console.log(err);
              res.redirect('/update');
            }else{
              console.log(doc);
              
              doc.password = hash;
              doc.save();
    
              req.flash(
                'success_msg',
                'Your account details updated'
              );
              res.redirect('/update');
          }
        });
      });
    });
          
    
  }
};


exports.setResetToken = (req, res) => {
  
  const generatedText = crypto({ length: 40 });
  console.log(generatedText);

  console.log('step 1 find the email and store into resetToken');

  User.findOne(
    { email: req.body.email },
    'resetToken resetTokenExpire email',
    null,
    (err, user) => {
      if (err) throw err;

      console.log(user);

      // User doen't exist
      if (!user) {
        req.flash(
          'error_msg',
          `The User with this ${req.body.email} is not Exist!`
        );
        return res.redirect('/user/forgot-password');
      } else {
        user.resetToken = generatedText;
        user.resetTokenExpire = Date.now() + 60000; //10 Min validation
        console.log(user);

        user.save((err) => {
          if (err) {
            console.log(
              'something went wron to save the resetTokent into db...'
            );
          }

          // Send the token to target mail
          console.log('step 2');

          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

          var mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'DHelp Password Reset',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:(only valid for 10mins)\n\n' +
              'http://' +
              req.headers.host +
              '/user/password-reset/' +
              generatedText +
              '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };

          console.log(mailOptions);
          console.log('step 3');

          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              console.log(
                'something went wront to sent the link to mail!' + err
              );
            }

            req.flash(
              'success_msg',
              `Your password is sent to ${req.body.email} mail!`
            );
            console.log('successfully sent the link');
            return res.redirect('/user/forgot-password');
          });
        });
      }
    }
  );
}

exports.getResetPasswordPage = (req, res) => {
  User.findOne(
    { resetToken: req.params.token, resetTokenExpire: { $gt: Date.now() } },
    'resetToken email',
    function (err, user) {
      console.log(user);
      if (!user) {
        req.flash(
          'error_msg',
          'Password reset token is invalid or has expired.'
        );
        return res.redirect('/user/forgot-password');
      }
      res.render('password-reset', {
        user: user,
      });
    }
  );
}

exports.setPasswordChange = (req, res) => {
  
  let errors = []; 

  const { password, password2 } = req.body;
  // Check they give password or not
  if (!password || !password2) {
    errors.push({ msg: 'Fill all the fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    const user = {
      email : req.body.email,
      resetToken : req.params.token
    }
    res.render('password-reset', {
      errors,
      user: user
    });
  } else {
    User.findOne(
      {
        resetToken: req.params.token,
        resetTokenExpire: { $gt: Date.now() },
      },
      function (err, user) {
        if (!user) {
          req.flash(
            'error_msg',
            'Password reset token is invalid or has expired.'
          );
          return res.redirect('/user/forgot-password');
        }
  
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            console.log('password' + user.password + 'and the user is' + user);
  
            user
              .save(function (err) {
                if (err) {
                  console.log('here');
                  req.flash(
                    'error_msg',
                    'Password is not changed try again after sometime!'
                  );
                  return res.redirect('/user/forgot-passoword');
                } else {
                  console.log('wait for sending confimation mail....');
                  // Send confirmation mail to student
                  var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.PASSWORD
                    },
                  });
  
                  var mailOptions = {
                    to: user.email,
                    from: process.env.EMAIL,
                    subject: 'Your password has been changed',
                    text:
                      'Hello,\n\n' +
                      ' - This is a confirmation that the password for your account ' +
                      user.email +
                      ' has just been changed.\n',
                  };
  
                  transporter.sendMail(mailOptions, function (err) {
                    // req.flash('success', 'Success! Your password has been changed.');
                    console.log('successfully changed!');
                    // done(err);
  
                    req.flash(
                      'success_msg',
                      'Password is changed now you can login!'
                    );
  
                    return res.redirect('/user/login');
                  });
                }
              });
              
          });
        });
      }
    );
  }
}