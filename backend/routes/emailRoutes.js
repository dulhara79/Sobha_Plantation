const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// Create a transport object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sobhaplantationsltd@gmail.com',
    pass: 'sdai cacd guiy hzso',
  },
});

// Email sending route
router.post('/send-email', async (req, res) => {
  const { formData } = req.body;

  // Email details
  const mailOptions = {
    from: 'sobhaplantationsltd@gmail.com',
    to: 'piyushiranasinghe@gmail.com',
    subject: 'New Plantation Schedule Created',
    text: `A new plantation schedule has been created with the following details:\n
           Plantation Date: ${formData.plantationDate}\n
           Assigned Team: ${formData.assignedTeam}\n
           Field Name: ${formData.fieldName}\n
           Crop Variety: ${formData.cropVariety}\n
           Seeds Used: ${formData.seedsUsed}\n
           Status: ${formData.status}\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

module.exports = router;
