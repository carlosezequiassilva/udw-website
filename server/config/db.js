const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Data Base Connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;