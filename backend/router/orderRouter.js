const express= require('express')
const router = express.Router()
const {newOrder, getSingleOrder, myOrders, totalValue, updateOrderStatus, deleteOrder} = require('../controller/orderController')
const {isAuthenticateduser, authorizeRoleBase}= require('../middleware/auth')
router.post('/newOrder' , isAuthenticateduser,newOrder)
router.get('/order/:id',isAuthenticateduser, getSingleOrder)
router.get('/orders',isAuthenticateduser,myOrders)
router.get('/admin/totalPrice',isAuthenticateduser,authorizeRoleBase('Admin'),totalValue)
router.delete('/orders/:id',isAuthenticateduser,deleteOrder)
router.route('/admin/order/:id').put(isAuthenticateduser,authorizeRoleBase('Admin'),updateOrderStatus).delete(isAuthenticateduser,authorizeRoleBase('Admin'),deleteOrder)
module.exports = router