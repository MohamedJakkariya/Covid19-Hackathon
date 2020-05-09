const appRoot = require('app-root-path');
var fs = require('fs');
var pdf = require('html-pdf');

exports.dynamicHtml = (req, res,docs) => {
  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>Pdf Modal</title><link rel="stylesheet" href="file:///C:/Users/mdjac/Desktop/NCC/public/lib/bootstrap/css/bootstrap.min.css" /><link rel="stylesheet" href="file:///C:/Users/mdjac/Desktop/NCC/public/img/showcase-1.jpg/lib/font-awesome/css/font-awesome.min.css" /><link rel="stylesheet" href="file:///C:/Users/mdjac/Desktop/NCC/public/css/pdf.css" /><style>h1{margin-left:5rem, font-size:1rem}h4{margin-left:14rem}</style></head><body><div class="form-group pt-4 col-md-7 mx-auto">';

  docs.forEach((student) => {
    html +=
      `<div style="margin-top: 1rem;"><img src="file:///C:/Users/mdjac/Desktop/NCC/public/img/uploaded_images/${student.profile}" alt="Profile" width="100px" height="100px" style="width: 200px; height: 200px; margin-left: 19rem;"><div style="margin: auto; margin-left: 10rem; margin-top: 3rem"><div class="info d-flex flex-row flex-wrap"> <label for="name" class="col-md-4">Name</label><p id="name" class="col-md-8" style="margin-left: 6.2rem;">${student.fullname}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="regno">Regno</label><p class="col-md-8" style="margin-left: 6rem;" id="regno">810018104048</p></div><div class="info d-flex flex-row flex-wrap"> <label for="fname" class="col-md-4">Father Name</label><p id="fname" class="col-md-8" style="margin-left: 3rem;">${student.fathername}</p></div><div class="info d-flex flex-row flex-wrap"> <label for="mname" class="col-md-4">Mother Name</label><p id="mname" class="col-md-8" style="margin-left: 2.5rem;">${student.mothername}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="email">Email</label><p class="col-md-8" style="margin-left: 6.5rem;" id="email">${student.email}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="dob">DOB</label><p class="col-md-8" style="margin-left: 6.8rem;" id="dob">${student.dob.toLocaleDateString()}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="gender">Gender</label><p class="col-md-8" style="margin-left: 5.8rem;" id="gender">${student.gender}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="bloodgroup">Blood Group</label><p class="col-md-8" style="margin-left: 3rem;" id="bloodgroup">${student.bloodgroup}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="aadhar">Aadhar</label><p class="col-md-8" style="margin-left: 5.3rem;" id="aadhar">2014 2019 4920 1298</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="contact">Contact</label><p class="col-md-8" style="margin-left: 5rem;" id="contact">${student.mobile}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="address">Address</label><p class="col-md-8" style="margin-left: 5rem;" id="address">${student.comaddress}</p></div><div class="info d-flex flex-row flex-wrap"> <label class="col-md-4" for="department">Department</label><p class="col-md-8" style="margin-left:3rem;" id="department">${student.degree}</p></div> <img src="file:///C:/Users/mdjac/Desktop/NCC/public/img/showcase-1.jpg" alt="Profile img " style="width: 150px;margin-top: 1rem; height: 150px; margin-left: 26rem;"></div></div></div></body></html>`;
  });

  const filename = 'pdfModal.html';
  const pathForGeneration = appRoot + '/public/generatedHtml/' + filename;

  fs.writeFileSync(pathForGeneration, html, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was generated!');
  });

  // Generation Start 
  var htmlToPdf = fs.readFileSync(appRoot + '/public/generatedHtml/pdfModal.html', 'utf8');

  var options = {
    format: 'A4',
    orientation: 'portrait',

    paginationOffset: 1,
    header: {
      height: "22mm",
      contents: '<div><h1 style="font-size: 1.8rem; margin-left: 7rem">University College Of Enginneering(BIT campus)</h1><h4>(2020 Enrollment cadet details)</h4></div>'
    },
    footer: {
      height: '28mm',
      contents: {
        first: '1',
        2: '2', // Any page number is working. 1-based index
        default:
          '<span style="color: #444; font-weight: bold; text-align: center">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: 'Last Page',
      },
    },
  };

  const path = appRoot + '/public/pdf/' + pdfFilename;

  pdf.create(htmlToPdf, options).toFile(path, function (err, file) {
    if (err) return console.log(err);
    console.log(file.filename); // { filename: '/app/businesscard.pdf' }
    res.render('pdfSend', {
      year: req.query.year,
      filename: pdfFilename,
      filepath: `../pdf/${pdfFilename}`
    });
  });
}