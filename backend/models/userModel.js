const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter The Name'],
        maxLength:[20,'name cant exceed more than 10 characters'],
        minLength:[3,'name must have the characters']

    },
    email:{
        type:String,
        required:[true, 'Please Enter The Email'],
        unique:true,
        // validate:[Validator.isEmail,'Please Enter Valid Email']

    },
    password:{
        type:String,
        required:[true, 'Please Enter The Password'],
        minLength:[8,'password should be greater than 8 character'],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
   
})

userSchema.methods.getJWTTOKEN = function(){
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRES_IN})
}

userSchema.methods.comparePassword = async function(enterpassword) {
    return bcrypt.compare(enterpassword,this.password)
    
}
module.exports = mongoose.model('User',userSchema)