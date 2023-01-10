"use strict";
const nodemailer = require("nodemailer");


export default function handler(req, res) {
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kiarra.breitenberg66@ethereal.email',
            pass: 'wkUqBckdnVNuP2aR9g'
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" kiarra.breitenberg66@ethereal.email', // sender address
      to: "bar@example.com, caiofabiocosta@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
    main().then(_ => res.status(200).json({ name: 'E-mail enviado' })).catch(console.error);
  
    
}
  
