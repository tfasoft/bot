import { API } from "$bot/api/index.js";

export const INFO = async (ctx) => {
  const { id } = ctx.callbackQuery.from;

  try {
    const { data } = await API.get(`users/${id}`);

    const iData = `
    Your information is listed here:
    - name: ${data.name}
    - tid: <code>${data.tid}</code>
        `;

    await ctx.replyWithHTML(iData);
  } catch (error) {
    await ctx.reply(error.response.data.message);
  }
};
