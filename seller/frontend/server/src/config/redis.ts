import Redis from "ioredis";

// lazyConnect: true prevents ioredis from connecting immediately, 
// allowing you to await redis.connect() safely in your index.ts
// Using 127.0.0.1 instead of localhost prevents IPv6 resolution issues with Docker Desktop on Windows
const redis = new Redis("redis://localhost:6379", { lazyConnect: true });

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (error) => {
    console.error("Redis connection error:", error);
});



export default redis;