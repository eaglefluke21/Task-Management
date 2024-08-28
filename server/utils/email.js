import { transporter } from "../config/nodemailer.js";
import dotenv from 'dotenv';

dotenv.config();

const reactUrl = process.env.REACT_URL;

const EMAIL = process.env.EMAIL;
const frontendurl = `${reactUrl}`;


export const sendResetEmail = (email,token) => {
    const resetUrl = `${frontendurl}/reset-password/${token}`;
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `You requestd a password reset. Click here to reset your password. ${resetUrl}`,

    };

transporter.sendMail(mailOptions, (error,info) => {
    if(error){
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


};