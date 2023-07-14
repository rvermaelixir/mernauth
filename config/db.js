const config = require('config')
const mongo = require('mongoose')

const connectDB = async () => {
    try{
        mongo.connect(process.env.MONGO_URI || config.get('mongoURI'));
    }catch(err){
        console.log(err.message)
        // exits process on failure of db connection
        process.exit(1)
    }
}
module.exports =  connectDB