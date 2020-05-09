const Personal = require('../models/Personal'),
  Lab = require('../models/Lab'),
  Food = require('../models/Food'),
  Symptoms = require('../models/Symptoms'),
  Hospital = require('../models/Hospital'),
  Transport = require('../models/Transport'),
  Doctor = require('../models/Doctor'),
  Toll = require('../models/Toll'),
  User = require('../models/User'),
  mail = require('../utils/sedingMail');

exports.getStatistics = async (req, res, route) => {
  let noOfUsers = 0,
    noOfApplication = 0,
    noOfVolunteers = 0,
    noOfHospitalAdmission = 0,
    noOfDoctorAdmission = 0,
    noOfLabResult = 0,
    noOfSymptoms = 0;

  await Hospital.find({}, 'id isCheck', async (err, docs) => {
    if (err) throw err;

    await docs.forEach((doc) => {
      if (!doc.isCheck) {
        noOfHospitalAdmission++;
      }
    });
  });

  //   Finding User calculation
  await User.find({}, 'id isVerified isVolunteer', async (err, docs) => {
    if (err) throw err;

    await docs.forEach((doc) => {
      if (!doc.isVerified) {
        noOfUsers++;
      }
      if (doc.isVolunteer) {
        noOfVolunteers++;
      }
    });
  });

  //   Finding Doctor need calculation
  await Doctor.find({}, 'id isCheck', async (err, docs) => {
    if (err) throw err;

    await docs.forEach((doc) => {
      if (!doc.isCheck) {
        noOfDoctorAdmission++;
      }
    });
  });

  //   Finding lab report calculation
  await Lab.find({}, 'id isCheck', async (err, docs) => {
    if (err) throw err;

    await docs.forEach((doc) => {
      if (!doc.isCheck) {
        noOfLabResult++;
      }
    });
  });

  //   Finding Symptoms calculation
  await Symptoms.find({}, 'id isCheck', async (err, docs) => {
    if (err) throw err;

    console.log(docs);

    await docs.forEach((doc) => {
      if (!doc.isCheck) {
        noOfSymptoms++;
      }
    });
  });

  noOfApplication =
    noOfHospitalAdmission + noOfDoctorAdmission + noOfLabResult + noOfSymptoms;

  await res.render(route, {
    noOfHospitalAdmission,
    noOfUsers,
    noOfApplication,
    noOfVolunteers,
    noOfDoctorAdmission,
    noOfLabResult,
    noOfSymptoms,
  });
};

exports.getResults = (res, Class, route, nameOfSection) => {
  //   Finding Symptoms calculation
  Class.find({}, (err, docs) => {
    if (err) throw err;

    console.log(docs);

    res.render(route, {
      docs,
      category: nameOfSection,
    });
  });
};

exports.setVerified = (req, res) => {
  // `doc` is the document _before_ `update` was applied

  User.findOneAndUpdate(
    req.params.id,
    { isVerified: true, new: true },
    (err, doc) => {
      if (err) {
        res.send(JSON.stringify('error'));
      }
      console.log(doc.email);
      // Profile Verified notification
      mail.informToUser(
        doc.email,
        'Your account was successfully verified and now you can access volunteer request and all those features! Thank you for member of our community to help others.'
      );

      res.send(JSON.stringify('verified'));
    }
  );
};


exports.insertNumToToll= (req, res) => {
  const { name, number, state} = req.body;

  // Check the num already exist or not 
  Toll.find({"number": number},{number, name}, (err, docs) => {
    if(err) console.log(err);
    
    if(docs.length){
      res.send(JSON.stringify('override'));
    }else{
      const newNum = new Toll({
        name,
        number,
        state
      });
  
      newNum
        .save()
        .then((num) => {
          res.send(JSON.stringify('added'));
        })
        .catch((err) => {
          console.log(err);
          res.send(JSON.stringify('error'));
        });
    }
  });
};

// Remove by id 
exports.removeById = (id, res) => {
  // Delete the document
  Toll.findByIdAndRemove(id, (err, doc) => {
    if (err) throw err;
    res.send(JSON.stringify('removed'));
  });
} 

