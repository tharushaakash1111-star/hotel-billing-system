import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize Socket.io Server for Real-Time Service Queue and Activity Feeds
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Socket Client Connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket Client Disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SkyNest HRGSMS Server running on http://localhost:${PORT}`);
});
