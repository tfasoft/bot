import { Redis } from "$bot/connections/index.js";
import bot from "$bot";

Redis.on("connect", () => {
  console.log("Redis connected.");
  bot.launch();
});
