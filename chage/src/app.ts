import express, { type Request, type Response, type NextFunction } from "express";
import cookie from "cookie-parser";
import cors from "cors";
import changepaswordRouter from "./changepasswordroute";


const app = express();

app.use(express.json());
app.use(cookie());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));

app.use("/auth", changepaswordRouter )

// Add CORS headers to allow requests from frontend development servers


// Redis setup


export default app;