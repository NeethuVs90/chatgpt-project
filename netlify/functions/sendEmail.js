const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    // 1. Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // set in Netlify ENV
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // 2. Define mail options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yourdestination@email.com", // change to your email
      subject: "New Contact Form Submission",
      text: `From: ${name} (${email})\n\n${message}`,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
