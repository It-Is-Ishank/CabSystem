const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendBookingConfirmationEmail = async (bookingDetails) => {
  const { startTime, source, destination, email } = bookingDetails;
  console.log(bookingDetails);

  const mailOptions = {
    from: {
      name: "MyVahan Support Team ",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "Cab Booking Confirmation",
    text: `Your cab has been booked for ${startTime} from ${source} to ${destination}.`,
  };

  try {
    const res = await transporter.sendMail(mailOptions)
    console.log("Mail sent")
  } catch (err) {
    console.log(err);
  }
};

// Function to send an email when a cab is cancelled
const sendCancellationEmail = async (bookingDetails) => {
    console.log(bookingDetails);
  const { startTime, source, destination, email } = bookingDetails;

  const mailOptions = {
    from: {
      name: "MyVahan Support Team ",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "Cab Booking Cancellation",
    text: `Your cab booking for ${startTime} from ${source} to ${destination} has been cancelled.`,
  };

  try {
    const res = await transporter.sendMail(mailOptions)
    console.log("Mail sent")
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendBookingConfirmationEmail, sendCancellationEmail };
