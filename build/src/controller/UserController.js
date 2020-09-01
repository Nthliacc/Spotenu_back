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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.body.role;
                if (type === "ADMIN") {
                    const tokenAdmin = req.headers.token;
                    if (!tokenAdmin) {
                        throw new Error("Don't authorization");
                    }
                    ;
                }
                ;
                let input;
                if (type === "ADMIN" || type === "FREE_USER" || type === "PREMIUM_USER") {
                    input = {
                        name: req.body.name,
                        nickname: req.body.nickname,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role
                    };
                }
                else {
                    input = {
                        name: req.body.name,
                        nickname: req.body.nickname,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                        description: req.body.description
                    };
                }
                ;
                console.log("Input: ", input);
                const token = yield new UserBusiness_1.UserBusiness().createUser(input);
                res.status(200).send({ message: token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TO DO - bandas não aprovadas não podem fazer login
            try {
                const loginData = {
                    emailOrNickname: req.body.emailOrNickname,
                    password: req.body.password
                };
                const token = yield new UserBusiness_1.UserBusiness().getUserByEmailOrNickname(loginData);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
;
