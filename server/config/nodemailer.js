import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const USER = process.env.EMAIL;
const PASS = process.env.EMAILPASSWORD;

//object to send mail to users
export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: USER,
        pass: PASS,
        
    },
});

