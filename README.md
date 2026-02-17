# Conference Room Booking System

Enterprise MERN stack booking platform with **real-time availability**, **conflict resolution**, and **admin dashboard**, supporting 200+ concurrent users with WebSocket integration for instant updates.

**Stack:** Node.js, Express.js, MongoDB, React.js, Socket.io, JWT, Material-UI, Docker, AWS EC2-ready.

## Features

- **JWT authentication** – Register, login, protected routes
- **Rooms** – List rooms with capacity and amenities; admins can add/deactivate
- **Bookings** – Create, update, cancel with **conflict detection** (overlapping slots rejected with clear error)
- **Real-time updates** – Socket.io broadcasts booking create/update/cancel to all connected clients
- **Admin dashboard** – Manage rooms, view and cancel all bookings
- **Docker** – Single `docker-compose` for backend, frontend (nginx), and MongoDB

## Quick start (local)

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
cp .env.example .env   # set MONGODB_URI, JWT_SECRET
npm install
npm run dev
```

Seed admin + sample rooms (optional):

```bash
node scripts/seed.js
# Login: admin@example.com / admin123
```

### Frontend

```bash
cd frontend
npm install
npm start
```

- App: http://localhost:3000  
- API: http://localhost:5000  

Register a user or use the seeded admin, then create bookings from **Rooms** or **My Bookings**. Admins see **Admin** in the sidebar.

## Docker

From the project root:

```bash
docker compose up -d --build
```

- App: http://localhost (port 80)  
- API: http://localhost:5000 (exposed for debugging; in production put nginx in front)

Frontend is built with `REACT_APP_API_URL=""` so it uses the same origin; nginx proxies `/api` and `/socket.io` to the backend.

To create an admin user and sample rooms after first run:

```bash
docker compose exec backend node scripts/seed.js
# Then open http://localhost and login: admin@example.com / admin123
```

## Deploy to AWS EC2

1. **Launch EC2** – e.g. Ubuntu 22.04, t3.small or larger, open ports 80, 443, 22.

2. **Install Docker** on the instance:

   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-plugin
   sudo usermod -aG docker $USER
   ```

3. **Clone and configure**:

   ```bash
   git clone <your-repo> && cd "Conference Room Booking System"
   export JWT_SECRET="your-strong-secret"
   # Optional: use MongoDB Atlas and set MONGODB_URI in docker-compose or .env
   ```

4. **Run with Docker Compose**:

   ```bash
   docker compose up -d --build
   ```

5. **HTTPS (recommended)** – Put a reverse proxy (e.g. Caddy or Nginx) on the host in front of port 80/5000, with SSL (e.g. Let’s Encrypt). Set `CLIENT_ORIGIN` and, if the API is on a different subdomain, `REACT_APP_API_URL` when building the frontend.

6. **Scaling** – For 200+ concurrent users, use a process manager (e.g. PM2) or multiple backend replicas behind a load balancer; ensure Socket.io is configured for sticky sessions or a shared adapter (e.g. Redis) if you run more than one backend node.

## API overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | - | Register |
| POST | /api/auth/login | - | Login (returns JWT) |
| GET | /api/auth/me | Bearer | Current user |
| GET | /api/rooms | - | List rooms |
| GET | /api/rooms/:id | - | Room by id |
| POST | /api/rooms | Admin | Create room |
| PUT | /api/rooms/:id | Admin | Update room |
| DELETE | /api/rooms/:id | Admin | Deactivate room |
| GET | /api/bookings | Bearer | My (or all for admin) bookings |
| GET | /api/bookings/availability | Bearer | Check conflicts (query: roomId, start, end) |
| POST | /api/bookings | Bearer | Create (409 if conflict) |
| PUT | /api/bookings/:id | Bearer | Update (409 if conflict) |
| PATCH | /api/bookings/:id/cancel | Bearer | Cancel |

## License

MIT.
