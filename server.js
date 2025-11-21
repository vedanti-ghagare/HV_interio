require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Optional home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST endpoint to send SMS using MSG91 API
app.post('/send-sms', async (req, res) => {
  const { name, email, message } = req.body;

  const smsText = `New contact form: ${name}, ${email}, ${message}`;

  try {
    await axios.post('https://api.msg91.com/api/v2/sendsms', {
      sender: 'Hvinterior',
      route: '4',
      country: '91',
      sms: [{
        message: smsText,
        to: ['9004899679']
      }]
    }, {
      headers: {
        'authkey': process.env.MSG91_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send('SMS sent');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('SMS failed');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
