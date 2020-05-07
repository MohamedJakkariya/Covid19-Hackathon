const express = require('express');

const router = express.Router();
const manipulationforAdmin = require('../db/manipulation-Admin');

// Welcome Page
router.get('/', (req, res) => res.render('index'));
router.get('/dashboard', (req, res) => {
  manipulationforAdmin.getStatistics(req,res, 'admin-panel');
});
router.get('/user-profile', (req, res) => res.render('user-panel'));
webpush = require("web-push");

const publicVapidKey =
  "BOjpHp4frhP-Wgw5q4x9Ed9PV022NqNCXlI9so2HmGpo4ZDSMwVp0tRz4NhKkYWqGCEObB8Di0GTVKYdI7alLIc";
const privateVapidKey = "hNhE2-YWuexqOXTB3VWoqWcWXkj5ydurEB8u0nN2HVI";

webpush.setVapidDetails(
  "mailto:jacksparrow.mdjack@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
router.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log(req.body);
  

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

module.exports = router;
