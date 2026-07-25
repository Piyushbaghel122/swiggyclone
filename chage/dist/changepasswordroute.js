import express from "express";
import auth_middleware from "./blacklist";
import { changepassword } from "./authcontroller";
const changepaswordRouter = express.Router();
changepaswordRouter.post("/changepassword", auth_middleware, changepassword);
export default changepaswordRouter;
