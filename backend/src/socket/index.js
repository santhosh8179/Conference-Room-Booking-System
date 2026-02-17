const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');

const { getIo } = require('../ioInstance');

const authSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Authentication required'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-in-production');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(new Error('User not found'));
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
};

function registerSocketHandlers(io) {
  io.use(authSocket);

  io.on('connection', (socket) => {
    socket.join('bookings');
    if (socket.user.role === 'admin') socket.join('admin');

    socket.on('disconnect', () => {});

    socket.on('join-room', (roomId) => {
      socket.join(`room-${roomId}`);
    });

    socket.on('leave-room', (roomId) => {
      socket.leave(`room-${roomId}`);
    });
  });
}

async function emitBookingUpdate(type, booking) {
  const io = getIo();
  if (!io) return;
  const populated = await Booking.findById(booking._id ?? booking)
    .populate('room', 'name capacity')
    .populate('user', 'name email');
  const payload = populated ? populated.toObject() : booking;
  io.to('bookings').emit('booking', { type, payload });
  if (payload.room?._id) {
    io.to(`room-${payload.room._id}`).emit('booking', { type, payload });
  }
}

module.exports = { registerSocketHandlers, emitBookingUpdate };
