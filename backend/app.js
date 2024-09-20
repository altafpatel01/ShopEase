const express = require('express')
const cookieParser = require('cookie-parser')
const productrouter = require('./router/productRoute')
const userrouter = require('./router/userRouter')
const orderrouter = require('./router/orderRouter')
const errorss = require('./middleware/errors')
const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1',productrouter)
app.use('/api/v1',userrouter)
app.use('/api/v1',orderrouter)





module.exports=app
app.use(errorss)