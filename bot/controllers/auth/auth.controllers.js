import { API } from "$bot/api/index.js";

export const LOGIN = async (ctx) => {
  const data = {
    tid: ctx.callbackQuery.from.id,
  };

  try {
    const result = await API.post("auth/login", data);

    await ctx.replyWithHTML(
      `Your token is:\n<code>${result.data.token}</code>`
    );
  } catch (error) {
    await ctx.reply(error.response.data.message);
  }
};

export const REGISTER = async (ctx) => {
  const data = {
    tid: ctx.callbackQuery.from.id,
  };

  try {
    const result = await API.post("auth/register", data);

    await ctx.reply(result.data.message);
  } catch (error) {
    await ctx.reply(error.response.data.message);
  }
};
