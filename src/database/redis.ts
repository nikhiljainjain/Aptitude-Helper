import redisClient from "redis";

const redisClientConnect = redisClient.createClient({ url: process.env.REDIS_URL });

redisClientConnect.on("ready", () => console.log("Redis is ready"));

redisClientConnect.on("error", ()=> console.error("ERROR in Redis"));

export default redisClientConnect;
