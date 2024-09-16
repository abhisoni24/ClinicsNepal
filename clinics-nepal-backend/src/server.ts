import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth';
import clinicRoutes from './routes/clinics';
import appointmentRoutes from './routes/appointments';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clinics-nepal';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/appointments', appointmentRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('book_appointment', (appointmentData) => {
    // Handle appointment booking
    // You can emit events to update other clients in real-time
    io.emit('appointment_booked', appointmentData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});