import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const JWT_KEY = process.env.JWT_KEY;
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS;

export {
    PORT,
    JWT_KEY,
    EMAIL_ID,
    EMAIL_PASS
}
