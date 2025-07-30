import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'new' }, // e.g., new, read, modified
  createdAt: { type: Date, default: Date.now }
});

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);