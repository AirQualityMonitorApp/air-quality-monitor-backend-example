import { adminAuth } from '../config/firebase';
import { Request, Response } from "express";
import { transporter } from "../config/nodemailer";
import { emailTemplate } from '../emailTemplate';


export const sendVerificationEmail = async (req: Request, res: Response) => {
   
    const { email } = req.body

    let mailOptions =  {
        from: "pietroballarin21@gmail.com",
        to: "",
        subject: "Activate your account",
        html: ""
    }
    
    try {
        const verificationLink = await adminAuth.generateEmailVerificationLink(email)
        
        mailOptions.to = email
        mailOptions.html = emailTemplate(verificationLink)

        const sentEmail = await transporter.sendMail(mailOptions, function(error: Error) {
            if (error) {
                console.log(error);
            } 
        });
        
        res.status(200).json({message: "OK"})

    } catch(error) {
        res.json({message: error})
    }
}