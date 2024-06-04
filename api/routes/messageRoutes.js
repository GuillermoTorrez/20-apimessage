import express from 'express';
import {sendMessage, receiveMessage } from "../controllers/messageController.js"

const router = express.Router();

router.post('/send', sendMessage);
router.post('/receive', receiveMessage);

export default router;