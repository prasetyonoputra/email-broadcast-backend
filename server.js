require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nodemailer = require("nodemailer");

async function sendEmail(to, subject, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "kurupuxx@gmail.com",
      to: to,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

app.post("/sendEmail", async (req, res) => {
  const data = req.body;
  await sendEmail(data.to, data.subject, data.message);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
