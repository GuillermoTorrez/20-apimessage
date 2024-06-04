import express from 'express';
import { sendMessage, receiveMessage } from '../controllers/messageController.js';

const router = express.Router();

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     description: Send a message using Twilio API and save it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "+1234567890"
 *               body:
 *                 type: string
 *                 example: "Hello World"
 *     responses:
 *       200:
 *         description: Message sent and saved
 *       400:
 *         description: Bad request
 */
router.post('/send', sendMessage);

/**
 * @swagger
 * /messages/receive:
 *   post:
 *     summary: Receive a message
 *     description: Receive a message from Twilio webhook and respond.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Body:
 *                 type: string
 *                 example: "Hi there"
 *               From:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Response sent
 *       400:
 *         description: Bad request
 */
router.post('/receive', receiveMessage);

export default router;
