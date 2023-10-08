const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
  try {
    let data = req.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: data.to,
      subject: data.subject,
      html: data.message,
    };

    const info = await transporter.sendMail(mailOptions);
    res.send(`Email sent to ${data.to}`)
  } catch (error) {
    console.error("Error occurred:", );
    res.send(error)
  }
}

module.exports = { sendEmail };
