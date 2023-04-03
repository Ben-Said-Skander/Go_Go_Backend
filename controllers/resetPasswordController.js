const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email-address@gmail.com",
    pass: "your-email-password",
  },
});

const sendPasswordResetEmail = (email, verificationCode) => {
  const mailOptions = {
    from: "bensaid303@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `To reset your password, please click the following link and enter the verification code: ${verificationCode}`,
    html: `<p>To reset your password, please click the following link and enter the verification code: ${verificationCode}.</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent : " + info.response);
    }
  });
};
module.exports = { sendPasswordResetEmail };
