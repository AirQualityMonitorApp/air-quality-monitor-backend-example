"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = void 0;
const firebase_1 = require("../config/firebase");
const emailTemplate_1 = require("../emailTemplate");
const nodemailer_1 = require("../config/nodemailer");
const resetUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let mailOptions = {
        from: "pietroballarin21@gmail.com",
        to: "",
        subject: "Activate your account",
        html: ""
    };
    try {
        const verificationLink = yield firebase_1.adminAuth.generatePasswordResetLink(email);
        mailOptions.to = email;
        mailOptions.html = (0, emailTemplate_1.emailTemplate)(verificationLink);
        const sentEmail = yield nodemailer_1.transporter.sendMail(mailOptions, function (error) {
            if (error) {
                res.json({ message: error });
            }
        });
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.resetUserPassword = resetUserPassword;
