const express = require('express');
const router = express.Router()
const orderController = require('../src/controller/order-controller');
const authService = require('../src/services/auth-service');

router.post('/', authService.authorize, orderController.post);
router.get('/' , authService.authorize, orderController.get );

module.exports = router