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
            if (type === "ADMIN" || type === "FREE_USER" || type === "PREMIUM_USER"){
                input = {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                };
            } else {
                input = {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    email: req.body.email,                   
                    password: req.body.password,
                    role: req.body.role,
                    description: req.body.description
                };
            };
             console.log("Input: ", input);
            const token = await new UserBusiness().createUser(input);

            res.status(200).send({ message: token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        // TO DO - bandas não aprovadas não podem fazer login
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