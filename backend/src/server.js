require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const { registerSocketHandlers } = require('./socket');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', credentials: true },
  pingTimeout: 60000,
  transports: ['websocket', 'polling'],
});
app.set('io', io);
require('./ioInstance').setIo(io);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

registerSocketHandlers(io);

const Booking = require('./models/Booking');
const { emitBookingUpdate } = require('./socket');
Booking.post('save', async function () {
  await emitBookingUpdate(this.wasNew ? 'created' : 'updated', this);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
