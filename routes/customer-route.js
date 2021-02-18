const express = require('express');
const router = express.Router()
const customerController = require('../src/controller/customer-controller');
const authService = require('../src/services/auth-service');

router.post('/findCustomer' , customerController.postFindImage )
router.post('/', customerController.post);
router.post('/authenticate', customerController.authenticate);
router.post('/refresh-token', authService.authorize, customerController.refreshToken);
router.put('/', customerController.updateImage);



module.exports = router