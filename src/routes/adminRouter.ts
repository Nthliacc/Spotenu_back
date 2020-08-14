import express from "express";
import { BandController } from "../controller/BandController";


export const adminRouter = express.Router();

const bandController = new BandController();

adminRouter.get("/all-bands", bandController.allBands);
adminRouter.put("/approve-band", bandController.approveBand);