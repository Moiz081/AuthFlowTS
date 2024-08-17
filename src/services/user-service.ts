import UserData from "../interfaces/user-interfaces";
import UserRepository from "../repository/user-repository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { EMAIL_ID, JWT_KEY } from "../config/server-config";
import { sender } from "../config/mail-config";
import shortid from "shortid";
import URL from "../models/url";

// Ensure JWT_KEY is always defined and not undefined
    const JWT_SECRET = JWT_KEY;

    export default class UserService {

    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: UserData) {
        try {
            const user = await this.userRepository.create(data);
            const token = this.createToken({ email: user.email, id: user.id });
            // Send verification email
            await this.sendVerificationEmail(user.email, token);
            return user;
        } catch (error) {
            console.log("Something went wrong in UserService create function");
            throw error;
        }
    }

    async signIn(email: string, plainPassword: string) {
        try {
            // step1: fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            console.log("User email and password",user);

            if (!user) {
                console.log("User not found");
                throw { error: "User not found" };
            }

            // step2: compare password sent by user with hashed password
            const passwordMatch = this.checkingPassword(plainPassword, user.password);
            console.log("Password match", passwordMatch);

            // If the password doesn't match
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: "Incorrect password"}
            }

            // step3: if passwords matched then create a new token and send it to the user
            const newJwt = this.createToken({ email: user.email, id: user.id });
            return { newJwt };
        } catch (error) {
            console.log("Error during sign-in process", error);
            throw error;
        }
    }

    isAuthenticated(token: string) { // The token will be sent in the headers.
        try {
            const response: any = this.verifyToken(token); // token: {email: '', id: '', iat: '', exp: ''}
            if(!response){
                throw {error: "Invalid Token"}
            }
            const user: any = this.userRepository.getById(response._id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user._id; // This userId is going to store in apiGateway request
        } catch (error) {
            console.log(error);
            console.log("Something went wrong in isAuthenticated function service layer");
            throw error;
        }
    }


    createToken(user: string | object) {
        try {
            const result = jwt.sign(user, JWT_SECRET as jwt.Secret, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in createToken function service layer");
            console.log(error);
            throw error;
        }
    }

    verifyToken(token: string) {
        try {
            const response = jwt.verify(token, JWT_SECRET as jwt.Secret);
            console.log("this is verify token:", response);
            return response;
        } catch (error) {
            console.log("Something went wrong in verifyToken function service layer");
            throw error;
        }
    }

    checkingPassword(inputTextPassword: string | Buffer, hashedPassword: string) {
        try {
            return bcrypt.compareSync(inputTextPassword, hashedPassword);
        } catch (error) {
            console.log("Something went wrong in checkingPassword function service layer");
            throw error;
        }
    }

    async handleGenerateNewShortURL(token: string) {
        const shortId = shortid();
        await URL.create({
            shortId: shortId,
            redirectURL: token
          });

        return shortId;
    }

    async sendVerificationEmail(email: string, token: string) {
        try {
            const shortenTokenID = await this.handleGenerateNewShortURL(token);

            const mailOptions = {
                from: EMAIL_ID,
                to: email,
                subject: 'Email Verification',
                text: `Hello,

Thank you for visiting our website! Please verify your email address by clicking the link below:

Verify Your Email Address

If the link does'nt work, copy and paste this URL into your browser: http://localhost:3000/verify/${shortenTokenID}.

This helps us secure your account and provide a better experience. If you did not request this, please contact our support team.

Best regards,

Md Moizuddin`
            };
            await sender.sendMail(mailOptions);

            console.log('Verification email sent to:', email);
        } catch (error) {
            console.log("Something went wrong in sendVerificationEmail function");
            throw error;
        }
    }

    async userProfile(userId: number) {
        try {
            const user = await this.userRepository.getById(userId);
            if (!user) {
                console.log("User not found");
                throw { error: "User not found" };
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in userProfile function service layer");
            throw error;
        }
    }
}
