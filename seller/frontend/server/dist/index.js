"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./src/services/socket"));
const db_1 = __importDefault(require("./src/config/db"));
const redis_1 = __importDefault(require("./src/config/redis"));
async function startServer() {
    try {
        await (0, db_1.default)();
        await redis_1.default.connect();
    }
    catch (error) {
        console.log("error", error);
    }
}
startServer();
const Server = http_1.default.createServer(app_1.default);
socket_1.default.attach(Server);
const PORT = 8003;
Server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
