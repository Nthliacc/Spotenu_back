import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/Users";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role
            };
            
            if(input.role === "ADMIN"){
                const tokenAdmin = req.headers.token as string;

                if(!tokenAdmin){
                    throw new Error("Don't authorization")  
                };
            return tokenAdmin
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
                email: req.body.email,
                password: req.body.password
            };

            const token = await new UserBusiness().getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}