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
    from: "adityadhar.hipl@gmail.com",
    to: email,
    subject,
    html,
  });

  console.log("Mail Sent:", info.messageId);
};

module.exports = sendEmail;