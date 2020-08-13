import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";

export class BandController{

    async allBands(req: Request, res: Response) {
        try {
            const token = req.headers.token as string;
            
            const authenticationData = new Authenticator().getData(token);
            const userRole = authenticationData.role;
            if(userRole != "ADMIN"){
                throw new Error("User not allowed")
            };

            const bands = await new UserDatabase().getAllBands();
            const listBands = bands.map((band: any) => ({
                name: band.name,
                email:band.email,
                nickname: band.nickname,
                status: band.status,
                description: band.description                
            }));
            
            res.status(200).send({listBands});

        } catch (error) {
            res.status(200).send({ message: error.message })
        }
        await BaseDatabase.destroyConnection();
    }

};