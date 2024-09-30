const express= require('express')
const router = express.Router()
const {registerUser,verifyEmailOtp,loginUser, logOut,forgotPassword,resetPassword,createReview, getUserDetail, updatePassword, updateProfile, getAllUser, getUser, updateUser, deleteUser, getProductReviews, deleteReview, deleteAccount} = require('../controller/userController')
const { isAuthenticateduser, authorizeRoleBase, } = require('../middleware/auth')
// const isAuthenticateduser = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/verify', verifyEmailOtp);

router.post('/login', loginUser)
router.get('/logout', logOut)

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route (accepts token as a parameter in the URL)
router.put('/reset-password/:token', resetPassword);
router.get('/me',isAuthenticateduser, getUserDetail)
router.put('/update-password',isAuthenticateduser,updatePassword)
router.put('/update-profile', isAuthenticateduser,updateProfile)
router.get('/admin/getAllUsers',isAuthenticateduser,authorizeRoleBase('Admin'),getAllUser)
router.get('/admin/getuser/:id',isAuthenticateduser,authorizeRoleBase('Admin'),getUser)
router.put('/admin/getuser/:id',isAuthenticateduser,authorizeRoleBase('Admin'),updateUser)
router.delete('/admin/getuser/:id',isAuthenticateduser,authorizeRoleBase('Admin'),deleteUser)
router.put('/review',isAuthenticateduser , createReview);
router.get('/product/:id/reviews', getProductReviews);
router.delete('/product/review', isAuthenticateduser, deleteReview);
router.delete('/delete-account',isAuthenticateduser,deleteAccount)
module.exports = router 