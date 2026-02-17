import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookRoomDialog from '../components/BookRoomDialog';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [bookDialog, setBookDialog] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const loadRooms = () => api.get('/rooms').then((res) => setRooms(res.data));

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Rooms
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <MeetingRoomIcon color="primary" />
                  <Typography variant="h6">{room.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Capacity: {room.capacity} · {room.floor ? `Floor ${room.floor}` : ''}
                </Typography>
                {room.amenities?.length > 0 && (
                  <Box sx={{ mt: 1, flexWrap: 'wrap', display: 'flex', gap: 0.5 }}>
                    {room.amenities.map((a) => (
                      <Chip key={a} label={a} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
                <CardActions sx={{ px: 0 }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => setBookDialog(room)}
                  >
                    Book this room
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {bookDialog && (
        <BookRoomDialog
          room={bookDialog}
          onClose={() => setBookDialog(null)}
          onSuccess={() => setBookDialog(null)}
          onError={setError}
        />
      )}
    </Box>
  );
}
