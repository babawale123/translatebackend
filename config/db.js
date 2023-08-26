const mongoose = require('mongoose')

const connectDB = (req,res) => {
    try {
        const connect = mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
        console.log(`connection to mongoDB successfull`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB