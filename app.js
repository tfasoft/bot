import { Redis } from "$bot/connections/index.js";
import bot from "$bot";

const redisConnectEvent = "connect";

Redis.on(redisConnectEvent, () => {
  console.log("Redis connected.");
  bot.startPolling();
});
