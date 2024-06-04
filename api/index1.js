import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import twilio from 'twilio';

dotenv.config()

const port = process.env.PORT || 1234

const htmlResponse404 = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Page Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                .container {
                    margin-top: 50px;
                }
                h1 {
                    font-size: 36px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404 Page Not Found</h1>
                <p>Sorry, the page you requested could not be found.</p>
            </div>
        </body>
        </html>
    `

// Setup Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express()
app.disable('x-powered-by')

// Middleware to parser JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGO_DB_NAME 
})
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB', err));;

const messageSchema = new mongoose.Schema({
    body: String,
    from: String,
    to: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

app.use((req, res, next) => {
    console.log("My First Middleware");
    next()
})

app.post('/send', async (req, res) => {
    const { to, body } = req.body;

    try {
        const message = await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });

        const newMessage = new Message({
            body: message.body,
            from: message.from,
            to: message.to
        });

        await newMessage.save();
        console.log("Mensaje enviado");

        res.status(200).send('Message sent and saved');
       
    } catch (error) {
        res.status(500).send(error.toString());
        console.log(error.toString())
    }
});

app.post('/receive', async (req, res) => {
    const { Body, From, To } = req.body;

    const newMessage = new Message({
        body: Body,
        from: From,
        to: To
    });

    await newMessage.save();

    const responseMessage = await client.messages.create({
        body: 'Thank you for your message!',
        from: To,
        to: From
    });

    res.status(200).send('<Response></Response>');
});



app.get('/', (req, res) => {
    res.status(200).send('<h1>This is my App Title</h1>')
})

app.post('/pokemon', (req, res) => {
    const data = req.body;
    data.timestamp = Date.now();
    res.status(201).json(data);
})

app.use((req, res) => {
    res.status(404).send(htmlResponse404)
})


// Start the Server
app.listen(port, ()=> {
    console.log(`server is running at http://localhost:${port}`);
})