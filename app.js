const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');

const User = require('./modules/user');

require('dotenv').config();
const env = process.env;

const bot = new Telegraf(env.BOT_TOKEN);

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;mongoose.connect(mdb)
    .then((connection) => {
        console.log('Connected');
        bot.launch();
    })
    .catch((error) => console.log(error));

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


bot.action('login', (ctx) => {
    // TODO: check if user is registered or not

    User.where("uid").equals(ctx.callbackQuery.from.id)
        .then((user_result) => ctx.reply(`Your token is:\n${user_result.token}`))
        .catch((error) => ctx.reply(error));
});

bot.action('register', (ctx) => {
    User.where('uid').equals(ctx.callbackQuery.from.id)
        .orFail((result) => {
            const userData = {
                uid: ctx.callbackQuery.from.id,
                token: "a-sample-token-to-generated"
            };
        
            const user = new User(userData);
        
            user.save()
                .then((result) => ctx.reply('You are now registered!'))
                .catch((error) => ctx.reply(error));
        })
        .then((fail) => ctx.reply('You are already registered!'));
});

bot.action('info', (ctx) => {
    // TODO: check user status

    const data = `
Your information is listed here:
*name*: ${ctx.callbackQuery.from.first_name}
*uid*: ${ctx.callbackQuery.from.id}
*registered*: ${false}
    `;

    ctx.replyWithMarkdown(data);
});