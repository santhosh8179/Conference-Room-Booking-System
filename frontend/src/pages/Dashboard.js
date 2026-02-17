import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventIcon from '@mui/icons-material/Event';
import api from '../services/api';
import { format } from 'date-fns';

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/rooms').then((res) => setRooms(res.data));
    const from = new Date();
    from.setDate(from.getDate() - 1);
    const to = new Date();
    to.setDate(to.getDate() + 7);
    api.get(`/bookings?from=${from.toISOString()}&to=${to.toISOString()}`).then((res) => setBookings(res.data));
  }, []);

  const todayBookings = bookings.filter(
    (b) => format(new Date(b.start), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <MeetingRoomIcon color="primary" />
                <Typography variant="h6">Rooms</Typography>
              </Box>
              <Typography variant="h4">{rooms.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Available for booking
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EventIcon color="primary" />
                <Typography variant="h6">Today's Bookings</Typography>
              </Box>
              <Typography variant="h4">{todayBookings.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmed for today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming (next 7 days)
              </Typography>
              <Typography variant="h4">{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {todayBookings.length > 0 && (
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Today's schedule
        </Typography>
      )}
      <Grid container spacing={1}>
        {todayBookings.slice(0, 6).map((b) => (
          <Grid item xs={12} sm={6} key={b._id}>
            <Card variant="outlined">
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="subtitle1">{b.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {b.room?.name} · {format(new Date(b.start), 'HH:mm')} – {format(new Date(b.end), 'HH:mm')}
                </Typography>
                <Chip size="small" label={b.user?.name} sx={{ mt: 0.5 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
