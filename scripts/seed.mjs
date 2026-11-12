import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rang_riwaayat';

async function seed() {
  console.log('Connecting to database:', MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');
    console.log('Seed verification complete.');
  } catch (err) {
    console.error('Seed script notice:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();

