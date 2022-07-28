const { Telegraf } = require('telegraf');
const Axios = require('axios');

require('dotenv').config();
const env = process.env;

const bot = new Telegraf(env.BOT_TOKEN);

bot.start((ctx) => {
    const message = "I can help you with a modern way to authenticate with Telegram.\nYou can register, login or see your status by clicking the buttons.";
    
    const buttons = {
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
    };

    ctx.reply(message, buttons);
});

bot.action('login', (ctx) => {
    const data = {
        tid: ctx.callbackQuery.from.id,
    }

    Axios.post(`${env.BACKEND_API}/bot/login`, data)
        .then((result) => {
            const data = result.data;

            ctx.replyWithHTML(`Your token is:\n<code>${data.token}</code>`);
        })
        .catch((error) => {
            ctx.reply(error.response.data.message);
        });
});

bot.action('register', (ctx) => {
    const data = {
        tid: ctx.callbackQuery.from.id,
    }

    Axios.post(`${env.BACKEND_API}/bot/register`, data)
        .then((result) => {
            const data = result.data;

            ctx.reply(data.message);
        })
        .catch((error) => {
            ctx.reply(error.response.data.message);
        });
});

// bot.action('last', (ctx) => {
//     mongoose.connect(mdb)
//         .then((connection) => {
//             User.findOneAndUpdate({tid: ctx.callbackQuery.from.id})
//                 .then((result) => {
//                     ctx.replyWithHTML(`Your token is:\n<code>${result.token}</code>`);
//                 })
//                 .catch((error) => ctx.reply(error));
//         })
//         .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
// });

bot.action('info', (ctx) => {
    const data = {
        tid: ctx.callbackQuery.from.id,
    }

    Axios.post(`${env.BACKEND_API}/bot/info`, data)
        .then((result) => {
            const data = result.data;

            ctx.reply(data.data);
        })
        .catch((error) => {
            ctx.reply(error.response.data.message);
        });
});

bot.launch();