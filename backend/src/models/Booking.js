const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  attendees: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true });

bookingSchema.index({ room: 1, start: 1, end: 1 });
bookingSchema.index({ start: 1, end: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
