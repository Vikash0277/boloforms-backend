

// utils/sendMail.js
const nodemailer = require('nodemailer');


const sendSigningEmail = async ({ to, documentId }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another provider like SendGrid, Mailgun
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `${process.env.BASE_URL}/sign/${documentId}/${encodeURIComponent(to)}`;

  const mailOptions = {
    from: `"BoloSign" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'You have been assigned a document to sign',
    html: `
      <h2>Hello,</h2>
      <p>You have been assigned a document to sign. Click the link below to review and sign:</p>
      <a href="${link}">${link}</a>
      <p>Thank you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
  }
};


module.exports=sendSigningEmail;