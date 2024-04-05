/**
 * @author Bhautik Koshiya
 */
const nodemailer = require('nodemailer');

/**
 * Logic to send emails.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "csci5708group15@gmail.com",
        pass: "hiry kpkt qrzc ignb"
    },
    tls: {
        rejectUnauthorized: false
    }
})

exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.USERNAME, 
        to: to, 
        subject: subject, 
        text: text  
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error occurred:', error.message);
        }else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
        }
    })
}