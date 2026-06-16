const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ email, subject, html }) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || "hello@demomailtrap.com",
    to: email,
    subject,
    html,
  });

  console.log("Mail Sent:", info.messageId);
};

// Add this to sendEmail.js to debug
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = sendEmail;