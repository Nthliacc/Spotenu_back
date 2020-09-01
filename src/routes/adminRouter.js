"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const BandController_1 = require("../controller/BandController");
exports.adminRouter = express_1.default.Router();
const bandController = new BandController_1.BandController();
exports.adminRouter.get("/all-bands", bandController.allBands);
exports.adminRouter.put("/approve-band", bandController.approveBand);
