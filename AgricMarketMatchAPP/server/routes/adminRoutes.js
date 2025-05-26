import express from 'express';
import User from '../models/User.js';
import Produce from '../models/Produce.js';
import PriceAlert from '../models/PriceAlert.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

router.get('/produce', protect, adminOnly, async (req, res) => {
  const produce = await Produce.find({});
  res.json(produce);
});

router.get('/alerts', protect, adminOnly, async (req, res) => {
  const alerts = await PriceAlert.find({});
  res.json(alerts);
});

export default router;
