import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/Users";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const type = req.body.role;
            if(type === "ADMIN"){
                const tokenAdmin = req.headers.token as string;

                if(!tokenAdmin){
                    throw new Error("Don't authorization")  
                };
            };

            let input: BandInputDTO | UserInputDTO;
            if (type === "Band"){
                input = {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    email: req.body.email,                   
                    password: req.body.password,
                    role: req.body.role,
                    description: req.body.description                    
                };
            } else {
                input = {
                    email: req.body.email,
                    name: req.body.name,
                    nickname: req.body.nickname,
                    password: req.body.password,
                    role: req.body.role
                };
            };
             
            const token = await new UserBusiness().createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {
            const loginData: LoginInputDTO = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password
            };

            const token = await new UserBusiness().getUserByEmailOrNickname(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

};