const nodemailer = require('nodemailer');

import { EMAIL_ID, EMAIL_PASS } from './server-config';

export const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASS
    }
});
