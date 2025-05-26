import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String },
  dateListed: { type: Date, default: Date.now }
});

export default mongoose.model('Produce', produceSchema);


