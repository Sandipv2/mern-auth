import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_APP_KEY
    }
})

export default transporter;