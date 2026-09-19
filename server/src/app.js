import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './modules/auth/auth.router.js';
import reservationRouter from './modules/reservations/reservation.router.js';
import serviceRouter from './modules/services/service.router.js';
import billingRouter from './modules/billing/billing.router.js';
import reportingRouter from './modules/reporting/reporting.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and CORS middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allows Google Fonts and images in dev mode
}));
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkyNest HRGSMS Server Running' });
});

// API Route Modules
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/services', serviceRouter);
app.use('/api/billing', billingRouter);
app.use('/api/reports', reportingRouter);

// Serve Frontend Production Build
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

export default app;
