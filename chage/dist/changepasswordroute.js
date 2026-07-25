import express from "express";
import { changepassword } from "./authcontroller";
const changepaswordRouter = express.Router();
changepaswordRouter.post("/changepassword", changepassword);
export default changepaswordRouter;
