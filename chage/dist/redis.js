import Redis from "ioredis";
const redis = new Redis("redis://localhost:6379");
redis.on("connect", () => {
    console.log("Connected to Redis");
});
redis.on("error", (err) => {
    console.error("Redis connection error:", err.message);
});
redis.on("close", () => {
    console.log("Disconnected from Redis");
});
export default redis;
