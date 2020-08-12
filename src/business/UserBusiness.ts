import { UserInputDTO, LoginInputDTO } from "../model/Users";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BandInputDTO } from "../model/Band";

export class UserBusiness {

    async createUser(user: UserInputDTO | BandInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        if( user.role === "ADMIN" && user.password.length < 10 ){
            throw new Error("Invalid password")
        } else if( user.password.length < 6 ){
            throw new Error("Invalid password")
        };

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, user.nickname, hashPassword, user.role);

        const accessToken =  new Authenticator().generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmailOrNickname(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmailOrNickname(user.emailOrNickname);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = new Authenticator().generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }
        return accessToken;
    }
}