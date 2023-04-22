import { API } from "$bot/api/index.js";

export const LOGIN = async (ctx) => {
  const data = {
    tid: ctx.callbackQuery.from.id,
  };

  try {
    const result = await API.post("auth/login", data);

    const messages = [
      "Your token is:",
      `<code>${result.data.token}</code>`,
      "\nYou can tap on the token to copy in clipboard.",
      "Token is alive for 1 minute.\n",
      "---------------",
      "🚫 Do not share this token with anyone.",
    ];

    await ctx.replyWithHTML(messages.join("\n"));
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
