import User from "../models/users";
import UserData from "../interfaces/user-interfaces";

export default class UserRepository {

    async create(data: UserData) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            throw error;
            console.log("Something went wrong in UserRepository create function");
        }
    }

    async getById(userId: number){
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer getById");
            throw error;
        }
    }

    async getByEmail(userEmail: string) {
        try {
            const user = await User.findOne(
                 {
                    email: userEmail
                }
            );
            if (!user) {
                throw Error;
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

}
