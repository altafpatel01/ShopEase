const express = require('express')
const cookieParser = require('cookie-parser')
const Razorpay = require('razorpay');
const bodyParser = require('body-parser')
const productrouter = require('./router/productRoute')
const userrouter = require('./router/userRouter')
const orderrouter = require('./router/orderRouter')
const fileUpload = require('express-fileupload');
const errorss = require('./middleware/errors')
const app = express()
const cors = require('cors');
app.use(
  cors({
    origin: 'https://shopease-oomg.onrender.com', // Replace with your Vercel frontend URL
    credentials: true, // If using cookies or other credentials
  })
);
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles: true, // Required if you plan to use cloud services like Cloudinary
    tempFileDir: '/tmp/', // Specify temp file directory for uploading files
}));

app.use('/api/v1',productrouter)
app.use('/api/v1',userrouter)
app.use('/api/v1',orderrouter)





module.exports=app
app.use(errorss)