const mongoose= require('mongoose')

const dbConnection = async ()=>{
    try {
      await  mongoose.connect(process.env.DB_URI).then((data)=>{
            console.log('Database is connecter successfully', data.connection.host)
        })
    } catch (error) {
        console.error(error)
        console.log('Facing problem while connecting to batabase ',error)
    }
}

module.exports = dbConnection