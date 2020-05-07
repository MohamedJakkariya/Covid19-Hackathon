const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
const Admin = require('../models/Admin');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // // Match user
          User.findOne({
            email: email,
          })
            .then((user) => {
              if (!user) {
                // return done(null, false, { message: 'That email is not registered' });
                // Check another table
    
                Admin.findOne({
                  email: email,
                })
                  .then((user) => {
                    if (!user) {
                      return done(null, false, {
                        message: 'That email is not registered',
                      });
                    }
                    console.log('In Admin user is ' + user);
    
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                      if (err) throw err;
                      if (isMatch) {
                        return done(null, user);
                      } else {
                        return done(null, false, { message: 'Password incorrect' });
                      }
                    });
                    //End of bcrypt
                  })
                  .catch((err) => console.log(err)); // End of Then
              } // End of If
    
              // Check whether the user is not in the User 
              const userpassword = user === null ? true : false;
              if (userpassword) {
              } else {
                // Match password
                user.viewBy = 'Student';
    
                user.save(err => {
                  if (err) throw err;
    
                  console.log('In Student is ' + user);
    
                  bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                      return done(null, user);
                    } else {
                      return done(null, false, { message: 'Password incorrect' });
                    }
                  });
                })
                
              }
            })
            .catch((err) => console.log(err));
        })
      );
    
      passport.serializeUser(function (user, done) {
        // console.log('In serializeUser' + user);
        const type = user.type;
        const id = user.id;
        const obj = { id, type };
        done(null, obj);
      });
    
      passport.deserializeUser(function (obj, done) {
        // console.log('In deserializeUser  id is = '+ obj.type);
    
        const condtion = obj.type === 'User' ? true : false;
    
        if (condtion) {
          User.findById(obj.id, function (err, user) {
            if (err) {
              console.log(err);
            }
            done(err, user);
          });
        } else {
          Admin.findById(obj.id, function (err, user) {
            if (err) {
              console.log(err);
            }
            done(err, user);
          });
        }
      });
};
