const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const message = "I can help you with a modern way to authenticate with Telegram.\nYou can register, login or see your status by clicking the buttons.";
    ctx.reply(
        message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Register",
                            callback_data: 'register'
                        },
                        {
                            text: "Login",
                            callback_data: 'login'
                        }
                    ],
                    [
                        {
                            text: "My info",
                            callback_data: 'info'
                        },
                    ],
                ]
            }
        }
    )
});


bot.action('login', (ctx) => ctx.reply("Login"));
bot.action('register', (ctx) => ctx.reply("Register"));

bot.action('info', (ctx) => {
    const data = `
Your information is listed here:
*name*: ${ctx.callbackQuery.from.first_name}
*uid*: ${ctx.callbackQuery.from.id}
*registered*: ${false}
    `;

    ctx.replyWithMarkdown(data);
});

bot.launch();