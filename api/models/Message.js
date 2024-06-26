import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  body: String,
  from: String,
  to: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);