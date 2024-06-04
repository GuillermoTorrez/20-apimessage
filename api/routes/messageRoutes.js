import express from 'express';
import {sendMessage, receiveMessage } from "../controllers/messageController.js"

const router = express.Router();

router.post('/api/send', sendMessage);
router.post('/api/receive', receiveMessage);

export default router;