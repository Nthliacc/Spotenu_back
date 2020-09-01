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
exports.BandController = void 0;
const Authenticator_1 = require("../services/Authenticator");
const BaseDatabase_1 = require("../data/BaseDatabase");
const BandDatabase_1 = require("../data/BandDatabase");
class BandController {
    allBands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.token;
                const authenticationData = new Authenticator_1.Authenticator().getData(token);
                const userRole = authenticationData.role;
                if (userRole != "ADMIN") {
                    throw new Error("User not allowed");
                }
                ;
                const bands = yield new BandDatabase_1.BandDatabase().getAllBands();
                const listBands = bands.map((band) => ({
                    name: band.name,
                    email: band.email,
                    nickname: band.nickname,
                    status: band.status,
                    description: band.description
                }));
                res.status(200).send({ listBands });
            }
            catch (error) {
                res.status(200).send({ message: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    approveBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.token;
                const authenticationData = new Authenticator_1.Authenticator().getData(token);
                const userRole = authenticationData.role;
                if (userRole != "ADMIN") {
                    throw new Error("User not allowed");
                }
                ;
                const bandId = req.body.bandId;
                if (!bandId) {
                    throw new Error("Insert a valid id");
                }
                ;
                const seachBand = yield new BandDatabase_1.BandDatabase().getBandById(bandId);
                if (!seachBand) {
                    throw new Error("This band don't exist. Insert a valid band!");
                }
                ;
                yield new BandDatabase_1.BandDatabase().postApproveBand(bandId);
                res.status(200).send({ message: "Approved Band" });
            }
            catch (error) {
                res.status(200).send({ message: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.BandController = BandController;
;
