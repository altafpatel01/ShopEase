const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [20, 'Name cannot exceed 20 characters'],
        minLength: [3, 'Name must have at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        // validate: [Validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'Password should be greater than 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailOtp: String, // OTP for email verification
    otpExpires: Date, // Expiration time for OTP
    isVerified: {
        type: Boolean,
        default: false,
    },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
    // Only hash the password if it is new or has been modified
    if (!this.isModified("password")) {
        return next();
    }

    // Hash the password with bcrypt (10 salt rounds)
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT token method
userSchema.methods.getJWTTOKEN = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    });
};

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
