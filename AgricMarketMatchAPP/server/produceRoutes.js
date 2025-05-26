import express from 'express';
import Produce from '../models/Produce.js';
const router = express.Router();

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const produce = new Produce(req.body);
    await produce.save();
    res.status(201).json(produce);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get listings by user
router.get('/user/:userId', async (req, res) => {
  const listings = await Produce.find({ userId: req.params.userId });
  res.json(listings);
});

// Get all listings
router.get('/', async (req, res) => {
  const listings = await Produce.find({});
  res.json(listings);
});
