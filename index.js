const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ashiqur999999@gmail.com",
    pass: process.env.password
  }
});

app.get('/', (req, res) =>{
  res.status(200).send('Welcome to Send Email')
})

// Endpoint to handle sending email
app.post('/send-email', (req, res) => {
  const { from, to, subject, text } = req.body;

  // Set up email options
  const mailOptions = {
    from,
    to,
    subject,
    text
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({isError:true,massage:'Error sending email'})
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({isError:false,massage:'Email sent'});
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
