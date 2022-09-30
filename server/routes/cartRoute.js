const express = require('express');
const { addCartItems, getCartItem } = require('../controller/cartController');
const router = express.Router();



router.post('/additems',addCartItems);
router.get('/:id',getCartItem);



module.exports = router;