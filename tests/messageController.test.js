import { expect } from 'chai';
import sinon from 'sinon';
import Message from '../models/Message.js';
import { sendMessage, receiveMessage } from '../controllers/messageController.js';
import * as twilioService from '../services/twilioService.js';

describe('Message Controller', () => {
  describe('sendMessage', () => {
    it('should send and save a message', async () => {
      const req = {
        body: {
          to: '+1234567890',
          body: 'Hello World',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(twilioService, 'sendTwilioMessage').resolves({
        body: 'Hello World',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+1234567890',
      });
      sinon.stub(Message.prototype, 'save').resolves();

      await sendMessage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith('Message sent and saved')).to.be.true;

      twilioService.sendTwilioMessage.restore();
      Message.prototype.save.restore();
    });
  });

  describe('receiveMessage', () => {
    it('should receive and respond to a message', async () => {
      const req = {
        body: {
          Body: 'Hi there',
          From: '+1234567890',
          To: process.env.TWILIO_PHONE_NUMBER,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(Message.prototype, 'save').resolves();
      sinon.stub(twilioService, 'sendTwilioMessage').resolves();

      await receiveMessage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith('<Response></Response>')).to.be.true;

      Message.prototype.save.restore();
      twilioService.sendTwilioMessage.restore();
    });
  });
});