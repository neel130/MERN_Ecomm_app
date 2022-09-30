const express = require('express');
const { updateUser, getSingleUser, getAllUser } = require('../controller/userController');
const { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin } = require('../Middleware/verifyToken');
const router = express.Router();


// router.put('/update/:id',verifyTokenandAuthorization,updateUser)
// router.get('/:id',verifyTokenandAuthorization,getSingleUser)
router.get('/all',verifyTokenandAdmin,getAllUser)




module.exports = router