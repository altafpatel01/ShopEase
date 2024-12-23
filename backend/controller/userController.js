const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const asyncHandler= require('../middleware/asyncHandler')
const sendToken = require('../utils/jwtToken')
const crypto = require('crypto');
const sendEmail = require('../utils/sendmails');
const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2
// const bcrypt =require('bcrypt')

//creating the account and generating the token

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
      return next(new ErrorHandler('Passwords does not match', 400));

  }
  const isRegister =await User.findOne({email:email})
  if (isRegister) {
    return next(new ErrorHandler('Email is all ready register', 400));

}

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
      name,
      email,
      password,
      avatar: {
          public_id: 'this is public id',
          url: 'publicurl',
      },
      emailOtp: otp, // Store the OTP in the database
      isVerified: false, // Set isVerified to false
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
  });

  // Send OTP via email
  const message = `
  Hi ${name},

  Welcome to ShopEase! 🎉 We're excited to have you on board.

  To complete your registration, please verify your email by using the One-Time Password (OTP) provided below:

  🔑 Your OTP: ${otp}

  Please note, this OTP will expire in 10 minutes, so be sure to verify your email before it expires.

  If you did not request this, please ignore this email.

  We're looking forward to helping you with your shopping experience.

  Best regards,
  The ShopEase Team
`;

  await sendEmail({
    to: user.email,
    subject: 'please verify your email for registering with ShopEase',
    text:message
    
  });

  // const transporter = nodemailer.createTransport({
  //     service: 'Gmail', // or another email provider
  //     auth: {
  //         user: process.env.EMAIL, // Your email address
  //         pass: process.env.PASSWORD, // Your email password
  //     },
  // });

  // await transporter.sendMail({
  //     from: process.env.EMAIL,
  //     to: user.email,
  //     subject: 'Email Verification OTP',
  //     text: message,
  // });

  res.status(200).json({
      success: true,
      message: 'An OTP has been sent to your email. Please verify.',
      user
  });
});

exports.resendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.findOne({email:email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
}
user.emailOtp = otp;
user.otpExpires = Date.now()+10*60*1000;

await user.save();

  // Send OTP via email
  const message = `Your email verification new OTP is: ${otp}. This OTP will expire in 10 minutes.`;

  await sendEmail({
    to: user.email,
    subject: 'Email verification for ShopEase Account',
    text:message
    
  });

  // const transporter = nodemailer.createTransport({
  //     service: 'Gmail', // or another email provider
  //     auth: {
  //         user: process.env.EMAIL, // Your email address
  //         pass: process.env.PASSWORD, // Your email password
  //     },
  // });

  // await transporter.sendMail({
  //     from: process.env.EMAIL,
  //     to: user.email,
  //     subject: 'Email Verification OTP',
  //     text: message,
  // });

  res.status(200).json({
      success: true,
      message: 'An new OTP has been sent to your email. Please verify.',

      user
  });
});

exports.verifyEmailOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
      return next(new ErrorHandler('User not found', 404));
  }

  // Check if OTP is correct and hasn't expired
  if (user.emailOtp !== otp || user.otpExpires < Date.now()) {
      return next(new ErrorHandler('Invalid or expired OTP', 400));
  }

  // Mark user as verified and clear OTP fields
 user.isVerified = true;
  user.emailOtp = undefined;
  user.otpExpires = undefined;

  await user.save();

  // Optionally, you can log the user in after verification
  sendToken(user, 200, res);

  const message = `
  Hi ${user.name},

  Congratulations! 🎉 Your email has been successfully verified.

  Welcome to the ShopEase family! 🛍️ We're thrilled to have you as part of our community. You can now enjoy full access to your account and start exploring our amazing products and deals.

  Here's what you can do next:
  - Browse our latest collections.
  - Add your favorite items to your cart.
  - Complete your purchase in a few easy steps.

  If you have any questions, feel free to reach out to our support team—we’re always here to help!

  Happy shopping!

  Best regards,
  The ShopEase Team
`;

  await sendEmail({
    to: user.email,
    subject: 'Welcome to ShopEase',
    text:message
    
  });
});

//login to the account and generate jwt token
exports.loginUser = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email||!password){
        return next(new ErrorHandler('please enter email and password both', 400))
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler('please enter valid email and password', 401))
    }

    const passwordMatch = await user.comparePassword(password)

    if(!passwordMatch){
        return next(new ErrorHandler('please enter valid email and password', 401))
    }
    sendToken(user,201,res)
   
})
//logout from account
exports.logOut= asyncHandler(async(req,res,next)=>{
    res.clearCookie('token');
  
  res.status(200).json({
    success:true,
    message:"user logout successfully"
  });
})
//generatingthe url and resettoken for updating the passwoord
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email address' });
    }

    // Generate a reset token
    const resetToken =  crypto.randomBytes(32).toString('hex');

    // Hash token and set reset token fields on the user (for example, 1 hour expiration)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${resetToken}`;
    // const resetUrl =`localhost:3000/reset-password/${resetToken}`
    console.log(resetUrl)


    // Send the email with the reset link
    const emailSent = await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: 'You requested a password reset. Please click on the link below to reset your password: If you did not request this, please ignore this email. This link is valid for 1 hour.',
      resetUrl:resetUrl,
    });

    if (!emailSent) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: 'Failed to send the email. Please try again later.' });
    }

    res.status(200).json({ message: 'Password reset link sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending password reset email', error: error.message });
  }
};//reset the password of the user 
exports.resetPassword = async (req, res,next) => {
    try {
      // Hash the token received from the URL
      const {token}=req.params
      
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
      // Find the user with the matching reset token and check if it's not expired
      const user = await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpire: { $gt: Date.now() }, // Ensure token has not expired
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Set the new password
      const { password,confirmPassword} = req.body;
      
      if(password!==confirmPassword){
        return next(new ErrorHandler('new password and confirm password are not match',400))
      }
    //   user.password = await bcrypt.hash(password, 10);
    user.password=password
  
      // Clear the reset token fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
  
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password', error });
    }
  };
//for accessing the profile of the user
exports.getUserDetail = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        message:'user Detail fetch successfully',
        user
    })
})

// update password of the login users
exports.updatePassword = asyncHandler(async(req,res ,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const ispasswordMatch = user.comparePassword(req.body.oldPassword)

    if(!ispasswordMatch){
        return next(new ErrorHandler('oldPassword is invalid', 401))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('newPassword and confirmPassword does not match', 400));
      }
    user.password = req.body.newPassword
    await user.save()

    sendToken(user,200,res)
    
})



exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
      return next(new ErrorHandler('User not found', 404));
  }
const imageid = user.avatar.public_id
 await cloudinary.uploader.destroy(imageid);
  // Check if a new avatar file is uploaded
  if (req.files && req.files.avatar) {
      const file = req.files.avatar;
      
      // Upload avatar image to Cloudinary

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'avatars',
          width: 150,
          
          crop: 'scale',
      });

      // Update user's avatar details in the database
      user.avatar.public_id = result.public_id;
      user.avatar.url = result.secure_url;
  }

  // Update name if provided
  user.name = name || user.name;

  await user.save();

  res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
  });
});
//get all user for admin
exports.getAllUser =asyncHandler(async(req,res)=>{
    const getUsers = await User.find({})
    res.status(200).json({
        success:true,
        message:"fetched all users",
        users:getUsers
    })
})
// get one use by id for admin
exports.getUser =asyncHandler(async(req,res,next)=>{
    const getUser = await User.findById({_id:req.params.id})

    if(!getUser){
        return next(new ErrorHandler("user not found",400))
    }

    res.status(200).json({
        success:true,
        message:"fetched users",
        users:getUser
    })
})

exports.updateUser = asyncHandler(async (req, res, next) => {
    
    // Find the logged-in user by ID (assume req.user contains the authenticated user)
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    const { name, email,role } = req.body;

     
    // Optional: check if email already exists (to avoid duplicates)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler('Email already taken by you or another user', 400));
    }

   // Update user details
   user.name = name || user.name;
   user.email = email || user.email;
   user.role = role|| user.role


    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: 'user updated successfully',
      user,
    });
 
})


exports.deleteUser = asyncHandler(async (req, res, next) => {
    
    // Find the logged-in user by ID (assume req.user contains the authenticated user)
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

        // Use deleteOne() to remove the document
       const deleteUser = await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'user deleted successfully',
      deleteUser,
    });
 
})


// Create or update a review for a product
exports.createReview = asyncHandler(async (req, res, next) => {
console.log(req.params.productId)
  const productId=req.params.productId
    const { rating, comment } = req.body;
  
    // Find the product by ID
    const product = await Product.findById(productId);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
  
    // Check if the user has already reviewed the product
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );
  
    if (isReviewed) {
      // If the user has already reviewed, update the existing review
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      // If the user has not reviewed, create a new review
      product.reviews.push({
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      });
      product.numOfReviews = product.reviews.length; // Update the number of reviews
    }
  
    // Calculate the average rating
    product.rating =
      product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
      product.reviews.length;
  
    // Save the product with the updated review
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: 'Review added/updated successfully',
    });
  });

  // Get all reviews for a specific product
exports.getProductReviews = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews, // Make sure this matches your schema's field name
    });
  });

  // Delete a review for a specific product
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const { productId, reviewId } = req.query; // Assuming the productId and reviewId are passed as query parameters
  
    const product = await Product.findById(productId);
  
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
  
    const reviews = product.reviews.filter(review => review._id.toString() !== reviewId.toString());
  
    if (reviews.length === product.reviews.length) {
      return next(new ErrorHandler('Review not found', 404));
    }
  
    // Calculate the updated ratings after removing the review
    const numOfReviews = reviews.length;
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const rating = numOfReviews === 0 ? 0 : totalRatings / numOfReviews;
  
    // Update the product with the new reviews and ratings
    await Product.findByIdAndUpdate(productId, {
      reviews: reviews,
      rating,
      numOfReviews,
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  });

  exports.deleteAccount = asyncHandler(async(req, res, next)=>{
    const id = req.user._id;
    const user = await User.findById(id)
    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
        
      });
  })


const Razorpay = require('razorpay');

// Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY ,  // Use your Razorpay Test Key ID
//   key_secret: process.env.RAZORPAY_SECRET   // Use your Razorpay Test Key Secret
// });

// Create a route to generate an order
exports.payment= asyncHandler(async (req, res) => {
  const { amount } = req.body;  // Amount should be passed in smallest currency unit, e.g., paise for INR
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY ,  // Use your Razorpay Test Key ID
    key_secret: process.env.RAZORPAY_SECRET   // Use your Razorpay Test Key Secret
  });
  const options = {
    amount: amount * 100,  // Convert to smallest currency unit
    currency: 'INR',       // Set currency
    receipt: 'order_rcptid_11'  // Receipt ID for tracking
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ id: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
