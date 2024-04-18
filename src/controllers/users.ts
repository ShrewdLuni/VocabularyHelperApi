import express from "express";

import { getUsers, getUserBySessionToken } from "../db/users";
import { merge } from "lodash";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

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