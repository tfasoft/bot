const { Telegraf } = require('telegraf');
const axios = require('axios');

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
                        text: "Connect to mobile",
                        callback_data: 'connect'
                    },
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

    axios.post(`${env.BACKEND_API}/user/login`, data)
        .then((result) => {
            const data = result.data;

            if (data.code === 2) {
                ctx.replyWithHTML(`Your token is:\n<code>${data.token}</code>`);
            } else {
                ctx.replyWithHTML(data.message);
            }
        })
        .catch((error) => {
            ctx.reply('Sorry, server is busy. Try again please.');
        });
});

bot.action('register', (ctx) => {
    const data = {
        tid: ctx.callbackQuery.from.id,
    }

    axios.post(`${env.BACKEND_API}/user/register`, data)
        .then((result) => {
            const data = result.data;

            ctx.reply(data.message);
        })
        .catch((error) => {
            ctx.reply('Sorry, server is busy. Try again please.');
        });
});

bot.action('connect', (ctx) => {
    const data = {
        tid: ctx.callbackQuery.from.id,
    }

    axios.post(`${env.BACKEND_API}/user/connect`, data)
        .then((result) => {
            const data = result.data;
            
            ctx.reply("You mobile code (mcode) will be send few seconds later. Do not share it with anyone else.")
            ctx.replyWithHTML(`<code>${data.mcode}</code>`);
        })
        .catch((error) => {
            ctx.reply('Sorry, server is busy. Try again please.');
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
        name: ctx.callbackQuery.from.first_name,
        tid: ctx.callbackQuery.from.id,
    }

    axios.post(`${env.BACKEND_API}/user/info`, data)
        .then((result) => {
            const data = result.data;

            ctx.replyWithHTML(data.data);
        })
        .catch((error) => {
            ctx.reply('Sorry, server is busy. Try again please.');
        });
});

bot.launch();