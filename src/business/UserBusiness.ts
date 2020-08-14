import { UserInputDTO, LoginInputDTO, Users } from "../model/Users";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BandInputDTO, Band } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";

export class UserBusiness {

    async createUser(user: BandInputDTO| UserInputDTO ) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        if( user.role === "ADMIN" && user.password.length < 10 ){
            throw new Error("Invalid password")
        } else if( user.password.length < 6 ){
            throw new Error("Invalid password")
        };

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);
        
        if(user.role === "BAND"){
            await new BandDatabase().createBand(id, user.name, user.nickname, user.email, hashPassword, user.role, user.status, user.description as string);
        }else{
            await new UserDatabase().createUser(id, user.name, user.nickname, user.email, hashPassword, user.role);
        }

        const accessToken =  new Authenticator().generateToken({ id, role: user.role });

        return {id, accessToken};
    }

    async getUserByEmailOrNickname(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmailOrNickname(user.emailOrNickname);
        
        if(userFromDB.getRole() === "BAND" && userFromDB.getStatus() === 0){
            throw new Error("Your band is under analysis.")
        }

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = new Authenticator().generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }
        return accessToken;
    }
}