const express= require('express')
const router = express.Router()
const {newOrder} = require('../controller/orderController')
const {isAuthenticateduser}= require('../middleware/auth')
router.post('/newOrder' , isAuthenticateduser,newOrder)



module.exports = router