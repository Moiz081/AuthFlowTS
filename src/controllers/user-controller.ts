import { Request, Response } from "express";
import UserService from "../services/user-service";

const userService = new UserService();

 const create = async (req: Request, res: Response) => {
    try {
        const user = await userService.create(req.body);
        return res.status(201).json({
            data: user,
            message: "Successfully created a user",
            success: true,
            err: {}
        })
    } catch (error: any) {
        res.status(500).json({
            data: {},
            message: error.message,
            success: false,
            err: error
        })
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        console.log(response);

        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully able to signIn',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            err: error,
            data: {},
            success: false,
            message: "unable to signIn",
        });
    }
}
const isVerified = async (req: Request, res: Response) => {
    try {
        res.send("<h1 style= 'color:green; font-weight:400;'>User email is verified</h1>")
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to verify the user',
            err: {error}
        });
    }
}

const isAuthenticated = async (req: Request, res: Response) => {
    try {
        const token = req.headers['x-access-token'] as string;
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'user is authenticated and token is valid',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to authenticate',
            err: {error}
        });
    }
}

const userProfile = async (req: Request, res: Response) => {
    try {
        const userId: any = req.params.id; // Extracted from JWT
        console.log("This is userId", userId);

        const response = await userService.userProfile(userId);
        console.log("This is response from getBYID", response);

        if (!response) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully able to get user profile',
            err: {}
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error });
    }
}

export default {
    create,
    signIn,
    isAuthenticated,
    isVerified,
    userProfile
};
