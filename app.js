const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const randomstring = require('randomstring');

const User = require('./modules/user');

require('dotenv').config();
const env = process.env;

const bot = new Telegraf(env.BOT_TOKEN);

const mdb = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_DATABASE}.ji4jf.mongodb.net/${env.MONGO_COLLECTION}?retryWrites=true&w=majority`;

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
    ctx.reply('Wait a bit . . .');
    
    mongoose.connect(mdb)
        .then((connection) => {
            const newToken = randomstring.generate({length: 25, charset: 'alphabetic'});

            User.findOneAndUpdate({uid: ctx.callbackQuery.from.id}, {token: newToken})
                .then((result) => {
                    if (result === null) {
                        ctx.reply('You are not registered.\nPress register button to register.');
                    } else {
                        ctx.replyWithHTML(`Your token is:\n<code>${newToken}</code>`);
                    }
                })
                .catch((error) => ctx.reply(error));
        })
        .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
});

bot.action('register', (ctx) => {
    ctx.reply('Wait a bit . . .');

    mongoose.connect(mdb)
        .then((connection) => {
            User.findOne({uid: ctx.callbackQuery.from.id})
                .then((result) => {
                    if (result === null) {
                        const user = new User({
                            uid: ctx.callbackQuery.from.id,
                            token: randomstring.generate({length: 25, charset: 'alphabetic'})
                        });
                    
                        user.save()
                            .then((result) => ctx.reply('You are now registered!'))
                            .catch((error) => ctx.reply(error));
                    } else {
                        ctx.reply('You are already registered!');
                    }
                })
                .catch((error) => ctx.reply(error));
        })
        .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
});

bot.action('info', (ctx) => {
    ctx.reply('Wait a bit . . .');
    
    mongoose.connect(mdb)
        .then((connection) => {
            let data = `
        Your information is listed here:
        - name: ${ctx.callbackQuery.from.first_name}
        - uid: ${ctx.callbackQuery.from.id}
        - Registration status:
            `;

            User.findOne({uid: ctx.callbackQuery.from.id})
                .then((result) => {
                    if (result === null) {
                        data += 'You are not registed yet.';
                        ctx.reply(data);
                    } else {
                        data += 'You are registered.';
                        ctx.reply(data);
                    }
                })
                .catch((error) => ctx.reply(error));
        })
        .catch((error) => ctx.reply('Sorry, server is busy. Press /start again.'));
});

bot.launch();