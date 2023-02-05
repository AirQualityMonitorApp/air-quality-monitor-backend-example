"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gmail',
    auth: {
        user: 'pietroballarin21@gmail.com',
        pass: 'hojepbawvufhraeh'
    }
});
