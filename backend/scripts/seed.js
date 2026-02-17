require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Room = require('../src/models/Room');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booking-system';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (!existing) {
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Created admin@example.com / admin123');
  }
  const roomCount = await Room.countDocuments();
  if (roomCount === 0) {
    await Room.insertMany([
      { name: 'Conference A', capacity: 12, floor: '1', amenities: ['Projector', 'Video call'] },
      { name: 'Conference B', capacity: 8, floor: '1', amenities: ['Whiteboard'] },
      { name: 'Meeting Room 1', capacity: 4, floor: '2', amenities: ['TV'] },
    ]);
    console.log('Created 3 sample rooms');
  }
  await mongoose.disconnect();
  console.log('Seed done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
