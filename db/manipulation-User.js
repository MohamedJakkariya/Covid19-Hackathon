const Personal = require('../models/Personal'),
  Lab = require('../models/Lab'),
  Food = require('../models/Food'),
  Symptoms = require('../models/Symptoms'),
  Hospital = require('../models/Hospital'),
  Transport = require('../models/Transport'),
  Doctor = require('../models/Doctor'),
  User = require('../models/User');

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

exports.setVolunteer = (req, res) => {
    filter = { id: req.body.id };
    update = {
      isCheck: true,
    };

    // `doc` is the document _before_ `update` was applied
    Login.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
      if (err) {
        console.log('Something went wrong when the update!');
        req.flash('error_msg', 'Something went wrong when Updated!');
        console.log(errors);
        res.render('apply', {
          action: 'volunteer',
          For: 'Apply for Volunteer member',
        })
      }
      console.log(doc);
      req.flash('success_msg', 'Now you\'re volunteer of the community!');
      res.redirect('/user-profile');
    });

};


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
