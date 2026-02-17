const Booking = require('../models/Booking');
const Room = require('../models/Room');

const hasConflict = (existing, start, end, excludeId = null) => {
  if (excludeId && existing._id.toString() === excludeId.toString()) return false;
  return existing.status === 'confirmed' && (
    (start >= existing.start && start < existing.end) ||
    (end > existing.start && end <= existing.end) ||
    (start <= existing.start && end >= existing.end)
  );
};

exports.getConflicts = async (roomId, start, end, excludeBookingId = null) => {
  const bookings = await Booking.find({
    room: roomId,
    status: 'confirmed',
    $or: [
      { start: { $lt: end }, end: { $gt: start } },
    ],
  }).populate('user', 'name email');
  return bookings.filter((b) => hasConflict(b, start, end, excludeBookingId));
};

exports.getAll = async (req, res) => {
  try {
    const { roomId, from, to, userId } = req.query;
    const filter = { status: 'confirmed' };
    if (roomId) filter.room = roomId;
    if (userId && req.user.role !== 'admin') filter.user = req.user._id;
    else if (userId) filter.user = userId;
    if (from || to) {
      filter.$and = [];
      if (from) filter.$and.push({ end: { $gt: new Date(from) } });
      if (to) filter.$and.push({ start: { $lt: new Date(to) } });
    }
    const bookings = await Booking.find(filter)
      .populate('room', 'name capacity')
      .populate('user', 'name email')
      .sort({ start: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room', 'name capacity')
      .populate('user', 'name email');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { room: roomId, title, start, end, attendees, notes } = req.body;
    if (!roomId || !title || !start || !end) {
      return res.status(400).json({ message: 'Room, title, start and end required' });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate <= startDate) {
      return res.status(400).json({ message: 'End must be after start' });
    }
    const room = await Room.findById(roomId);
    if (!room || !room.isActive) return res.status(404).json({ message: 'Room not found' });
    const conflicts = await exports.getConflicts(roomId, startDate, endDate);
    if (conflicts.length > 0) {
      return res.status(409).json({
        message: 'Time slot conflicts with existing booking',
        conflicts: conflicts.map((c) => ({
          id: c._id,
          title: c.title,
          start: c.start,
          end: c.end,
          user: c.user,
        })),
      });
    }
    const booking = await Booking.create({
      room: roomId,
      user: req.user._id,
      title,
      start: startDate,
      end: endDate,
      attendees: attendees || 0,
      notes: notes || '',
    });
    const populated = await Booking.findById(booking._id)
      .populate('room', 'name capacity')
      .populate('user', 'name email');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    const { room: roomId, title, start, end, attendees, notes } = req.body;
    const startDate = start ? new Date(start) : booking.start;
    const endDate = end ? new Date(end) : booking.end;
    const rid = roomId || booking.room;
    if (endDate <= startDate) {
      return res.status(400).json({ message: 'End must be after start' });
    }
    const conflicts = await exports.getConflicts(rid, startDate, endDate, booking._id);
    if (conflicts.length > 0) {
      return res.status(409).json({
        message: 'Time slot conflicts with existing booking',
        conflicts: conflicts.map((c) => ({
          id: c._id,
          title: c.title,
          start: c.start,
          end: c.end,
          user: c.user,
        })),
      });
    }
    if (title !== undefined) booking.title = title;
    if (roomId !== undefined) booking.room = roomId;
    booking.start = startDate;
    booking.end = endDate;
    if (attendees !== undefined) booking.attendees = attendees;
    if (notes !== undefined) booking.notes = notes;
    await booking.save();
    const populated = await Booking.findById(booking._id)
      .populate('room', 'name capacity')
      .populate('user', 'name email');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    booking.status = 'cancelled';
    await booking.save();
    const populated = await Booking.findById(booking._id)
      .populate('room', 'name capacity')
      .populate('user', 'name email');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, start, end, excludeBookingId } = req.query;
    if (!roomId || !start || !end) {
      return res.status(400).json({ message: 'roomId, start, end required' });
    }
    const conflicts = await exports.getConflicts(
      roomId,
      new Date(start),
      new Date(end),
      excludeBookingId || null
    );
    res.json({ available: conflicts.length === 0, conflicts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
