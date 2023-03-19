import { adminAuth } from '../config/firebase';
import { Request, Response } from "express";
import { emailTemplate } from '../emailTemplate';
import { transporter } from "../config/nodemailer";

export const resetUserPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    let mailOptions =  {
        from: "pietroballarin21@gmail.com",
        to: "",
        subject: "Activate your account",
        html: ""
    }

    try {
        const verificationLink = await adminAuth.generatePasswordResetLink(email)

        mailOptions.to = email
        mailOptions.html = emailTemplate(verificationLink)

        const sentEmail = await transporter.sendMail(mailOptions, function(error: Error) {
            if (error) {
                res.json({message: error});
            }
        });

        res.status(200).json({message: "Password reset successfully"})

    } catch(error) {
        res.json({message: error})
    }
}
