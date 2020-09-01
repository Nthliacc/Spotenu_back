"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
const BandDatabase_1 = require("../data/BandDatabase");
class UserBusiness {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generate();
            if (user.role === "ADMIN" && user.password.length < 10) {
                throw new Error("Invalid password");
            }
            else if (user.password.length < 6) {
                throw new Error("Invalid password");
            }
            ;
            const hashManager = new HashManager_1.HashManager();
            const hashPassword = yield hashManager.hash(user.password);
            if (user.role === "BAND") {
                yield new BandDatabase_1.BandDatabase().createBand(id, user.name, user.nickname, user.email, hashPassword, user.role, user.status, user.description);
            }
            else {
                yield new UserDatabase_1.UserDatabase().createUser(id, user.name, user.nickname, user.email, hashPassword, user.role);
            }
            const accessToken = new Authenticator_1.Authenticator().generateToken({ id, role: user.role });
            return { id, accessToken };
        });
    }
    getUserByEmailOrNickname(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDatabase = new UserDatabase_1.UserDatabase();
            const userFromDB = yield userDatabase.getUserByEmailOrNickname(user.emailOrNickname);
            if (userFromDB.getRole() === "BAND" && userFromDB.getStatus() === 0) {
                throw new Error("Your band is under analysis.");
            }
            const hashManager = new HashManager_1.HashManager();
            const hashCompare = yield hashManager.compare(user.password, userFromDB.getPassword());
            const accessToken = new Authenticator_1.Authenticator().generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }
            return accessToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
