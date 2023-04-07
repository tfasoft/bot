import { API } from "$bot/api/index.js";

export const LOGIN = async (ctx) => {
  const data = {
    tid: ctx.callbackQuery.from.id,
  };

  try {
    const result = await API.post("auth/login", data);

    if (data.code === 2) {
      await ctx.replyWithHTML(
        `Your token is:\n<code>${result.data.token}</code>`
      );
    } else {
      await ctx.replyWithHTML(result.data.message);
    }
  } catch (error) {
    await ctx.reply("Something went wrong.");
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
    await ctx.reply("Something went wrong.");
  }
};
