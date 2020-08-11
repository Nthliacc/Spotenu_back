import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/Users";
import { AdminBusiness } from "../business/AdminBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class AdminController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role
            };
            //const tokenAdmin = req.headers.token as string;

            const adminBusiness = new AdminBusiness();
            const token = await adminBusiness.createAdmin(input);

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

            const adminBusiness = new AdminBusiness();
            const token = await adminBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}