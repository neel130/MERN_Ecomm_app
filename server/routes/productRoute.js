const express = require('express');
const { createProduct, GetallProducts, getSingleProduct } = require('../controller/productController');
const { verifyTokenandAdmin } = require('../Middleware/verifyToken');
const router = express.Router();



router.post('/create',verifyTokenandAdmin,createProduct);
router.get('/all',GetallProducts);
router.get('/:id',getSingleProduct);









module.exports = router 