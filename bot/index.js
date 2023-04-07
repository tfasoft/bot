import { Socks5 } from "$bot/connections/index.js";
import { botConfig, appConfig } from "$bot/config/index.js";
import { Basic, Auth, User } from "$bot/controllers/index.js";

import { Telegraf } from "telegraf";

const bot = new Telegraf(botConfig.token, {
  telegram: {
    agent: !appConfig.published && Socks5,
  },
});

bot.start((ctx) => Basic.START(ctx));

bot.action("login", (ctx) => Auth.LOGIN(ctx));
bot.action("register", (ctx) => Auth.REGISTER(ctx));

bot.action("connect", (ctx) => User.CONNECT(ctx));
bot.action("info", (ctx) => User.INFO(ctx));

export default bot;
