import { auth, adminAuth } from '../config/firebase';
import { Response } from "express";
import { UserRequest } from "../types/types";
import { transporter } from "../config/nodemailer";
import { emailTemplate } from '../emailTemplate';

const airQualityModel = require('../schema');

export const createUser =  async (req: UserRequest, res: Response) => {

    const { email, password } = req.body
    
    let mailOptions =  {
        from: "pietroballarin21@gmail.com",
        to: "",
        subject: "Activate your account",
        html: ""
    }

    try {
        const userRecord = await auth.createUser({
            email: email,
            password: password,
            isEmailVerified: false
        })
        
        const uid = userRecord.uid
        const data = new airQualityModel({
            uid: uid, 
            timestamp: new Date()
        })
        const verificationLink = await adminAuth.generateEmailVerificationLink(email)
        
        mailOptions.to = email
        mailOptions.html = emailTemplate(verificationLink)
        
        const sentEmail = await transporter.sendMail(mailOptions, function(error: Error) {
            if (error) {
                console.log(error);
            } 
        });
        data.save()
        
        res.status(200).json({message: "User created"})
  
    } catch(error) {
        res.json({message: error})
    };
};