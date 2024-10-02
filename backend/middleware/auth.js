const jwt= require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
// const jwtTOken = require("../utils/jwtToken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/userModel");
require('dotenv').config()
exports.isAuthenticateduser = asyncHandler(async(req,res,next)=>{
    const token = await req.cookies.token
    if(!token){
        return next(new ErrorHandler('please go to login',401))
    }

    const decodedData =await jwt.verify(token,process.env.JWT_SECRET)
    req.user= await User.findById(decodedData.id)
    next()

})

exports.authorizeRoleBase= (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`protecter route not allow to access by unauthorize user ${req.user.role}` ,403))
        }
        next()
    }
}
