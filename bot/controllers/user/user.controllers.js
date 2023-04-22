import { API } from "$bot/api/index.js";

export const INFO = async (ctx) => {
  const { id } = ctx.callbackQuery.from;

  try {
    const { data } = await API.get(`users/${id}`);

    const iData = `Your Telegram ID is: <code>${data.tid}</code>`;

    await ctx.replyWithHTML(iData);
  } catch (error) {
    await ctx.reply(error.response.data.message);
  }
};

export const My_LOGS = async (ctx) => {
  const { id } = ctx.callbackQuery.from;

  try {
    const { data } = await API.get(`users/logs/${id}`);

    const logins = ["Here are your logins.\n"];

    await Promise.all(
      data.map(async (login) => {
        const td = new Date(login.createdAt);

        const translatedDate = `${td.getFullYear()}/${td.getMonth()}/${td.getDay()} ${td.getHours()}:${td.getMinutes()}`;

        const log = `Login to ${login.service.name}. Provided by ${login.company.companyName} at ${translatedDate}.`;

        logins.push(log);
      })
    );

    await ctx.reply(logins.join("\n"));
  } catch (error) {
    await ctx.reply(error.response.data.message);
  }
};
