"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3001"],
        credentials: true
    }
});
io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    });
    socket.emit("message", "hello");
});
exports.default = io;
