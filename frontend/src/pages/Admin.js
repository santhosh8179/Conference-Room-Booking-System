import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';
import { format } from 'date-fns';

function RoomsTab() {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(10);
  const [floor, setFloor] = useState('');
  const [error, setError] = useState('');

  const load = () => api.get('/rooms').then((res) => setRooms(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/rooms', { name, capacity, floor: floor || undefined });
      setOpen(false);
      setName('');
      setCapacity(10);
      setFloor('');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add room
      </Button>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((r) => (
              <TableRow key={r._id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.capacity}</TableCell>
                <TableCell>{r.floor || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="error" onClick={() => handleDelete(r._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add room</DialogTitle>
        <form onSubmit={handleCreate}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              margin="normal"
              inputProps={{ min: 1 }}
            />
            <TextField
              fullWidth
              label="Floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  const load = () => {
    setLoading(true);
    api
      .get('/bookings')
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('booking', load);
    return () => socket.off('booking', load);
  }, [socket]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      load();
    } catch (err) {}
  };

  const confirmed = bookings.filter((b) => b.status === 'confirmed' && new Date(b.end) >= new Date());

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        All confirmed upcoming bookings across rooms. Real-time updates via WebSocket.
      </Typography>
      {loading ? (
        <Typography color="text.secondary">Loading…</Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {confirmed.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.title}</TableCell>
                  <TableCell>{b.room?.name}</TableCell>
                  <TableCell>{b.user?.name}</TableCell>
                  <TableCell>{format(new Date(b.start), 'PPp')}</TableCell>
                  <TableCell>{format(new Date(b.end), 'HH:mm')}</TableCell>
                  <TableCell align="right">
                    <Button size="small" color="error" onClick={() => handleCancel(b._id)}>
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default function Admin() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin dashboard
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Rooms" />
        <Tab label="All bookings" />
      </Tabs>
      {tab === 0 && <RoomsTab />}
      {tab === 1 && <BookingsTab />}
    </Box>
  );
}
