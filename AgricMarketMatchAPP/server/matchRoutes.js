import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Produce from '../models/Produce.js';

const router = express.Router();

// POST: Find matches for produce (buyer side)
router.post('/search', protect, async (req, res) => {
  try {
    const { produceName, location } = req.body;
    const matches = await Produce.find({
      name: new RegExp(produceName, 'i'),
      available: true
      // Optionally: filter by proximity/location
    }).populate('sellerId', 'name email');

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
