const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "sumitbhatia0796@gmail.com",
    pass: "frbmqctfkzfadndr",
  },
});

async function sendMail(to, subject, text, html) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'sumitbhatia0796@gmail.com', // sender address
      to,
      subject,
      text,
      html
    });
    console.log("Email sent: ", info.messageId);
     return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // rethrow the error to be caught by the caller
  }
}

module.exports = { sendMail };