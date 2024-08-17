import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true});

userSchema.pre('save', function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
