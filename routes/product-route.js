const express = require('express');
const router = express.Router();
const productController = require('../src/controller/product-controller');
const authService = require('../src/services/auth-service');

router.get('/' , productController.get )
router.get('/:slug' , productController.getBySlug )
router.get('/adm/:id' , productController.getById)
router.get('/tags/:tag' , productController.getByTags)
router.post('/', authService.authorize ,productController.post )
router.put('/:id',  authService.authorize, productController.put);
router.delete('/',  authService.authorize, productController.delete);

module.exports = router;