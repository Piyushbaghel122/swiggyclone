import express, { type Request, type Response, type NextFunction } from "express";
import cookie from "cookie-parser";
import cors from "cors";
import changepaswordRouter from "./changepasswordroute";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cookie());
app.use(express.static("public"));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));

app.use("/auth", changepaswordRouter )

// Add CORS headers to allow requests from frontend development servers


// Redis setup

// Serve built Vite frontend from ../frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^(.*)$/, (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

export default app;