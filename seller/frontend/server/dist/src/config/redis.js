"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
// lazyConnect: true prevents ioredis from connecting immediately, 
// allowing you to await redis.connect() safely in your index.ts
// Using 127.0.0.1 instead of localhost prevents IPv6 resolution issues with Docker Desktop on Windows
const redis = new ioredis_1.default("redis://localhost:6379", { lazyConnect: true });
redis.on("connect", () => {
    console.log("Redis connected");
});
redis.on("error", (error) => {
    console.error("Redis connection error:", error);
});
exports.default = redis;
