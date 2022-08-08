const { Telegraf } = require('telegraf');

const CommandControllers = require("./controllers/CommandControllers");
const ActionControllers = require("./controllers/ActionControllers");

require('dotenv').config();
const env = process.env;

const bot = new Telegraf(env.BOT_TOKEN);

bot.start(CommandControllers.start);

bot.action('login', ActionControllers.login);
bot.action('register', ActionControllers.register);
bot.action('connect', ActionControllers.connect);
bot.action('info', ActionControllers.info);

module.exports = bot;