const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

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
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
