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

    axios.post(`${env.BACKEND_API}/bot/login`, data)
        .then((result) => {
            const data = result.data;

            ctx.replyWithHTML(`Your token is:\n<code>${data.token}</code>`);
        })
        .catch((error) => {
            console.log(error);
        });
});

// bot.action('register', (ctx) => {
//     mongoose.connect(mdb)
//         .then((connection) => {
//             User.findOne({tid: ctx.callbackQuery.from.id})
//                 .then((result) => {
//                     if (result === null) {
//                         const user = new User({
//                             tid: ctx.callbackQuery.from.id,
//                             token: randomstring.generate({length: 25, charset: 'alphabetic'})
//                         });
                    
//                         user.save()
//                             .then((result) => ctx.reply('You are now registered!'))
//                             .catch((error) => ctx.reply(error));
//                     } else {
//                         ctx.reply('You are already registered!');
//                     }
//                 })
//                 .catch((error) => ctx.reply(error));
//         })
//         .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
// });

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

// bot.action('info', (ctx) => {
//     mongoose.connect(mdb)
//         .then((connection) => {
//             let data = `
//         Your information is listed here:
//         - name: ${ctx.callbackQuery.from.first_name}
//         - tid: <code>${ctx.callbackQuery.from.id}</code>
//         - Registration status:
//             `;

//             User.findOne({tid: ctx.callbackQuery.from.id})
//                 .then((result) => {
//                     if (result === null) {
//                         data += 'You are not registed yet.';
//                         ctx.replyWithHTML(data);
//                     } else {
//                         data += 'You are registered.';
//                         ctx.replyWithHTML(data);
//                     }
//                 })
//                 .catch((error) => ctx.reply(error));
//         })
//         .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
// });

bot.launch();