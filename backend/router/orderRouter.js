const express= require('express')
const router = express.Router()
const {newOrder, getSingleOrder, myOrders, totalValue} = require('../controller/orderController')
const {isAuthenticateduser, authorizeRoleBase}= require('../middleware/auth')
router.post('/newOrder' , isAuthenticateduser,newOrder)
router.get('/order/:id',isAuthenticateduser, getSingleOrder)
router.get('/orders/me',isAuthenticateduser,myOrders)
router.get('/totalPrice',isAuthenticateduser,authorizeRoleBase('Admin'),totalValue)

module.exports = router