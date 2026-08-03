import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "../src/route/authRoute";


const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/auth" , AuthRoute);

app.post("/" , (req:Request , res:Response) => {
    res.send("hello-world")    
})


export default app;
