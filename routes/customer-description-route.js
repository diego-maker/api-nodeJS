const express = require('express');
const router = express.Router()
const customerController = require('../src/controller/customer-description-controller');
const authService = require('../src/services/auth-service');

router.post('/' , customerController.post )
router.put('/', customerController.put);
router.post('/customerId', customerController.getId);


module.exports = router