const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('DB SERVER connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error to initialize db');
    }
}

module.exports = {
    dbConnection
}