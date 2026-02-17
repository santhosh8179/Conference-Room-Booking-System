import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import api from '../services/api';
import { format } from 'date-fns';

export default function BookRoomDialog({ room, onClose, onSuccess, onError }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [conflict, setConflict] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConflict(null);
    setLoading(true);
    try {
      await api.post('/bookings', {
        room: room._id,
        title: title || `Meeting - ${room.name}`,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
        notes,
      });
      onSuccess();
      onClose();
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.conflicts) {
        setConflict(err.response.data);
      } else {
        onError(err.response?.data?.message || 'Booking failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const defaultStart = new Date(now);
  defaultStart.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0);
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setHours(defaultStart.getHours() + 1);

  const startVal = start || format(defaultStart, "yyyy-MM-dd'T'HH:mm");
  const endVal = end || format(defaultEnd, "yyyy-MM-dd'T'HH:mm");

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book {room?.name}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Meeting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Meeting - ${room?.name}`}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Start"
            type="datetime-local"
            value={startVal}
            onChange={(e) => setStart(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="End"
            type="datetime-local"
            value={endVal}
            onChange={(e) => setEnd(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
          />
          {conflict && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {conflict.message}
              {conflict.conflicts?.map((c) => (
                <div key={c.id}>
                  {c.title} – {format(new Date(c.start), 'PPp')} to {format(new Date(c.end), 'PPp')} by {c.user?.name}
                </div>
              ))}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Create booking
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
