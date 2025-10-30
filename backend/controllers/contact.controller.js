import { ContactMessage } from '../models/contact.model.js';

// Submit a new contact message
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const senderRole = req.user?.role || "buyer";  // Get role from authenticated user

    const newMsg = new ContactMessage({ name, email, subject, message, senderRole });
    await newMsg.save();
    res.status(201).json({ success: true, message: 'Message submitted successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Get all contact messages (admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a contact message by ID (admin only)
export const updateMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // e.g., { status: 'read' }

    const updatedMsg = await ContactMessage.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMsg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message updated successfully', updatedMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


