const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI

if (!URI) {
  throw new Error('MONGODB_URI environment variable not defined');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
};

connectToDatabase();

module.exports = mongoose;