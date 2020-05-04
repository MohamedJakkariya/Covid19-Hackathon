const Personal = require('../models/Personal'),
  Lab = require('../models/Lab'),
  Food = require('../models/Food'),
  Symptoms = require('../models/Symptoms'),
  Hospital = require('../models/Hospital'),
  Transport = require('../models/Transport'),
  Doctor = require('../models/Doctor');

exports.insertDataToFood = (req, res) => {
  const { name, mobile, age, currentAddress, foodmembers, foodlist } = req.body;

  if (
    !name ||
    !mobile ||
    !currentAddress ||
    !age ||
    !foodmembers ||
    !foodlist
  ) {
    req.flash('error_msg', 'Please enter all fields');
    res.redirect('/user/Food');
  } else {
    const isTrue = true;
    const newData = new Food({
      name,
      mobile,
      age,
      currentAddress,
      isTrue,
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
  }
};

exports.insertDataToTransport= (req, res) => {
  const { name, mobile, age, currentAddress, transportMonth, transportType } = req.body;

  if (
    !name ||
    !mobile ||
    !currentAddress ||
    !age ||
    !transportMonth ||
    !transportType
  ) {
    req.flash('error_msg', 'Please enter all fields');
    res.redirect('/user/transport');
  } else {
    const isTrue = true;
    const newData = new Transport({
      name,
      mobile,
      age,
      currentAddress,
      isTrue,
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
  }
};
