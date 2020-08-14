import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandDatabase } from "../data/BandDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Band } from "../model/Band";

export class BandController{

    async allBands(req: Request, res: Response) {
        try {
            const token = req.headers.token as string;
            
            const authenticationData = new Authenticator().getData(token);
            const userRole = authenticationData.role;
            if(userRole != "ADMIN"){
                throw new Error("User not allowed")
            };

            const bands = await new BandDatabase().getAllBands();
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
    async approveBand(req: Request, res: Response) {
        try {
            const token = req.headers.token as string;
            const authenticationData = new Authenticator().getData(token);
            const userRole = authenticationData.role;
            if(userRole != "ADMIN"){
                throw new Error("User not allowed")
            };

            const bandId = req.body.bandId;
            if(!bandId){
                throw new Error("Insert a valid id")
            };

            const seachBand = await new BandDatabase().getBandById(bandId);
            if(!seachBand){
                throw new Error("This band don't exist. Insert a valid band!")
            };

            await new BandDatabase().postApproveBand(bandId);
            
            res.status(200).send({message: "Approved Band"});

        } catch (error) {
            res.status(200).send({ message: error.message })
        }
        await BaseDatabase.destroyConnection();
    }
};