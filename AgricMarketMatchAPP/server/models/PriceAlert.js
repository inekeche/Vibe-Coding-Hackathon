import mongoose from 'mongoose';

const priceAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produce: { type: String, required: true },
  priceThreshold: { type: Number, required: true },
  location: { type: String }, // optional
  notified: { type: Boolean, default: false }
});

export default mongoose.model('PriceAlert', priceAlertSchema);
