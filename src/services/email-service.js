const key  = require('../config');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(key.sendgridKey);

exports.send = async (to, subject, body) => {
    console.log(to);
    const msg = {
        to: to, // Change to your recipient
        from: 'droberto9999@gmail.com', // Change to your verified sender
        subject: subject,
        text: 'Qualquer pessoa consegue integrar essa api :)',
        html: body,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}