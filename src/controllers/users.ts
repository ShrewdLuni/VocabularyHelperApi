import express from "express";

import { merge } from "lodash";
import { db } from "./db";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await db.user.findMany();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getCurrentUser = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['SHREWD-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        
        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
} 


export const getUserBySessionToken = async (sessionToken: string) => {
    try {
        const users = await db.user.findMany();
        return users
    } catch (error) {
        return error
    }
}

// // export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: String) => db.findOne({ email });
// // export const getUserBySessionToken = (sessionToken : String) => UserModel.findOne({'authentication.sessionToken' : sessionToken,});
// // export const getUserById = (id : String) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// // export const deleteUserById = (id: String) => UserModel.findOneAndDelete({ _id: id});
// // export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
// // export const getUserByUsername = (username: String) => UserModel.findOne({ username }); 