import express from 'express';

import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { getAllMessages, submitContactMessage, updateMessageById } from '../controllers/contact.controller.js';


const router = express.Router();

router.post('/', submitContactMessage);   // route for POST /api/v1/contact
router.get('/admin/messages', isAuthenticated, isAdmin, getAllMessages);
router.patch('/admin/messages/:id', isAuthenticated, isAdmin, updateMessageById);

export default router;

