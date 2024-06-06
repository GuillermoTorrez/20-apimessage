import Message from '../models/Message.js';
import { sendTwilioMessage } from '../services/twilioService.js';

export const sendMessage = async (req, res) => {
  const { to, body } = req.body;
  try {
    const message = await sendTwilioMessage({ body, to });
    const newMessage = new Message({
      body: message.body,
      from: message.from,
      to: message.to,
    });
    await newMessage.save();

    res.status(200).send('Message sent and saved');

  } catch (error) {
    res.status(500).send(error.toString());
    console.log(error.toString())
  }
};

export const receiveMessage = async (req, res) => {
  const { Body, From, To } = req.body;
  try {
    const newMessage = new Message({ body: Body, from: From, to: To });
    await newMessage.save();
    await sendTwilioMessage({
      body: 'Thank you for your message!',
      from: To,
      to: From,
    });
    res.status(200).send('<Response></Response>');
  } catch (error) {
    res.status(500).send(error.toString());
    console.log(error.toString())
  }
};