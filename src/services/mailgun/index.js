const Mailgun = require('mailgun-js');
const { MAIL_GUN_API_KEY, MAIL_GUN_DOMAIN } = require('../../config/config');

const mailgun = Mailgun({
    apiKey: MAIL_GUN_API_KEY,
    domain: MAIL_GUN_DOMAIN,
});

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 1000; // 1 second

const asyncSendEmail = async (data) => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            return await new Promise((resolve, reject) => {
                mailgun.messages().send(data, (err, body) => {
                    if (err) reject(err);
                    else resolve(body);
                });
            });
        } catch (error) {
            if (attempt === MAX_RETRIES) throw error;
            await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        }
    }
};

exports.sendEmailWithTemplate = async ({ from, templateName, user, attachment, messageConditions }) => {
    const data = {
        from,
        to: user.email,
        subject: messageConditions.subject,
        template: templateName,
        attachment: attachment,
        'h:X-Mailgun-Variables': messageConditions.mailgunVariables,
    };

    try {
        const result = await asyncSendEmail(data);
        return result;
    } catch (error) {
        console.error('Failed to send email after retries', error);
        throw error; // Or handle the error as per your application's needs
    }
};
