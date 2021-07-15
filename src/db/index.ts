import mongoose from 'mongoose';

require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`;

export async function initDb() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
}
