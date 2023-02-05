const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gmail',
    auth: {
    user: 'pietroballarin21@gmail.com',
    pass: 'hojepbawvufhraeh'
  }
  });

