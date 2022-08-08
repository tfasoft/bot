const axios = require('axios');

require('dotenv').config();
const env = process.env;

const login = (ctx) => {
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
}

const register = (ctx) => {
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
}

const connect = (ctx) => {
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
}

const info = (ctx) => {
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
}

module.exports = {
    login,
    register,
    connect,
    info,
}