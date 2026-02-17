import { Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const nav = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/rooms', label: 'Rooms', icon: <MeetingRoomIcon /> },
  { path: '/bookings', label: 'My Bookings', icon: <EventIcon /> },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Conference Room Booking
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.name}
            {user?.role === 'admin' && ' (Admin)'}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 220, top: 64, boxSizing: 'border-box' },
        }}
      >
        <List>
          {nav.map(({ path, label, icon }) => (
            <ListItemButton
              key={path}
              selected={location.pathname === path}
              onClick={() => navigate(path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
          {user?.role === 'admin' && (
            <ListItemButton
              selected={location.pathname === '/admin'}
              onClick={() => navigate('/admin')}
            >
              <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7, ml: '220px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
