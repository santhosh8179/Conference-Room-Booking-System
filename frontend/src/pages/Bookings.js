import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';
import { format } from 'date-fns';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const socket = useSocket();

  const load = () => {
    setLoading(true);
    api
      .get('/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setError('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onBooking = () => load();
    socket.on('booking', onBooking);
    return () => socket.off('booking', onBooking);
  }, [socket]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel');
    }
  };

  const upcoming = bookings.filter((b) => new Date(b.end) >= new Date() && b.status === 'confirmed');
  const past = bookings.filter((b) => new Date(b.end) < new Date() || b.status === 'cancelled');

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
        Upcoming
      </Typography>
      {loading ? (
        <Typography color="text.secondary">Loading…</Typography>
      ) : upcoming.length === 0 ? (
        <Typography color="text.secondary">No upcoming bookings.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {upcoming.map((b) => (
            <Card key={b._id} variant="outlined">
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle1">{b.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {b.room?.name} · {format(new Date(b.start), 'EEE, d MMM yyyy HH:mm')} –{' '}
                      {format(new Date(b.end), 'HH:mm')}
                    </Typography>
                    {b.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {b.notes}
                      </Typography>
                    )}
                  </Box>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteOutlineIcon />}
                      onClick={() => handleCancel(b._id)}
                    >
                      Cancel
                    </Button>
                  </CardActions>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Typography variant="h6" color="text.secondary" sx={{ mt: 3, mb: 1 }}>
        Past / Cancelled
      </Typography>
      {!loading && past.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {past.slice(0, 10).map((b) => (
            <Card key={b._id} variant="outlined" sx={{ opacity: 0.85 }}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2">
                  {b.title} · {b.room?.name} · {format(new Date(b.start), 'PP')}
                  {b.status === 'cancelled' && (
                    <Chip size="small" label="Cancelled" color="default" sx={{ ml: 1 }} />
                  )}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
