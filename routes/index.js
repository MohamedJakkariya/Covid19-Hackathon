const express = require('express');
const router = express.Router();
const manipulationforAdmin = require('../db/manipulation-Admin');


// Welcome Page
router.get('/',(req, res) => res.render('index'));
router.get('/dashboard', (req, res) => res.render('admin-panel'))
module.exports = router;
