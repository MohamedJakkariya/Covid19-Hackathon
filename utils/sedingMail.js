const nodemailer = require('nodemailer');

exports.informToAdmin = (usermail) => {
  const admin = 'jacksparrow.mdjack@gmail.com';

  // Send intimation to admin
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, ///Admin mail put here to inform it
      pass: process.env.PASSWORD,
    },
  });

  console.log('from system-mail -> ' + process.env.EMAIL);
  console.log('to admin-mail -> ' + admin);

  var mailOptions = {
    from: process.env.EMAIL, ///static system mail
    to: admin, ///Admin mail put here to inform it
    subject: 'Account Verification',
    text:
      'Hello,\n\n' +
      ' - This is a Inform mail of student signup and Kindly verify it after 7days otherwise the signup account automatically will be truncated!' +
      usermail +
      ' is an Unverified Profile.\n',
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    }else{
      console.log('successfully mail send to admin!');
    }

  });
};

// Inform to usr for account status
exports.informToUser = (usermail, message) => {
  // Send confirmation mail to student
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    to: usermail, ///User mail put here to inform it
    from: process.env.EMAIL,
    subject: 'Account Status',
    text: message,
  };

  transporter.sendMail(mailOptions, function (err) {
    console.log('successfully mail send to user for account status!');
  });
};

exports.pdfToMail = (email, year) => {
  console.log('wait for sending confimation mail....');
  // Send confirmation mail to student
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    to: email,
    from: process.env.EMAIL,
    subject: `The Enrollment students of the year ${year}`,
    text: 'Check out this attached pdf file',
    attachments: [
      {
        filename: 'enroll.pdf',
        path: 'C:/Users/mdjac/Desktop/NCC/public/pdf/enroll.pdf',
        contentType: 'application/pdf',
      },
    ],
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      console.log('Successfully sent to mail');
    }
  });
};

exports.bulkMail = (emails, message) => {
  // Send confirmation mail to student
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    to: emails, ///Admin mail put here to inform it
    from: process.env.EMAIL,
    subject: 'Announcement',
    text:
      'Hi students!,\n\n' +
      'This is for Ncc cadets\n\n' +
      message +
      '\n\n From anna university(Bit campus)',
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    }
    console.log('successfully mail sen bulk mail!');
  });
};
