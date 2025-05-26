import express from 'express';
import PriceAlert from '../models/PriceAlert.js';

// Add a new price alert
router.post('/alerts', async (req, res) => {
  try {
    const alert = new PriceAlert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get alerts for a user
router.get('/alerts/:userId', async (req, res) => {
  const alerts = await PriceAlert.find({ userId: req.params.userId });
  res.json(alerts);
});



import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import PriceAlert from '../models/PriceAlert.js';

const router = express.Router();

// POST: Set price alert (protected)
router.post('/alerts', protect, async (req, res) => {
  try {
    const { produce, priceThreshold } = req.body;
    const alert = new PriceAlert({
      userId: req.user.id,
      produce,
      priceThreshold
    });
    await alert.save();
    res.status(201).json({ message: 'Alert set' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
