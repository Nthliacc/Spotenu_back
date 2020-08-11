import express from "express";
import { AdminController } from "../controller/AdminController";


export const adminRouter = express.Router();

const adminController = new AdminController();

adminRouter.post("/signup", adminController.signup);
adminRouter.post("/login", adminController.login);