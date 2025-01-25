

const jwtTOken = (user,statusCode,res)=>{
    const token = user.getJWTTOKEN()
    const options ={
        expires:new Date(
            Date.now() + process.env.COOKIES_EXPIRES*24*60*60*1000
        ),
        httpOnly:true,
        secure:true,
        sameSite: 'None',
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        message:'login',
        user,
        token

    })
}

module.exports=jwtTOken