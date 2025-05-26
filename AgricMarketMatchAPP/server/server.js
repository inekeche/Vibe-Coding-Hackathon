// Root project structure assumed:
// agric-market-match/
// ├── client/               # React frontend
// └── server/               # Express backend

// === BACKEND ===
// File: server/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import produceRoutes from './routes/produceRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/match', matchRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));


  import { checkAlerts } from './cron/checkAlerts.js';

setInterval(() => {
  checkAlerts();
}, 60 * 1000); // every 1 min


import adminRoutes from './routes/adminRoutes.js';
app.use('/api/admin', adminRoutes);

