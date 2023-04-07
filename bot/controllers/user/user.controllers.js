import { API } from "$bot/api/index.js";

export const CONNECT = async (ctx) => {
  const data = {
    tid: ctx.callbackQuery.from.id,
  };

  try {
    const result = await API.post("users/connect", data);

    await ctx.reply(
      "You mobile code (mcode) will be send few seconds later. Do not share it with anyone else."
    );
    await ctx.replyWithHTML(`<code>${result.data.mcode}</code>`);
  } catch (error) {
    await ctx.reply("Something went wrong.");
  }
};

export const INFO = async (ctx) => {
  const { id } = ctx.callbackQuery.from;

  try {
    const result = await API.get(`users/${id}`);

    await ctx.replyWithHTML(result.data);
  } catch (error) {
    await ctx.reply("Something went wrong.");
  }
};
