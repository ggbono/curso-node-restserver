const mongoose = require('mongoose');

const CNN="mongodb+srv://ggbono:VfN791D8xGTPASz9@clustercafe.prnzd.mongodb.net/cafeDB"

const dbConnection = async () => {
    try {
        await mongoose.connect(CNN)
        console.log('DB SERVER connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error to initialize db');
    }
}

module.exports = {
    dbConnection
}