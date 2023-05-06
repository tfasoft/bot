import { API } from "$bot/api/index.js";

export const START = async (ctx) => {
  console.log(ctx.startPayload);

  const payload = "provider-Facebook--service-Authentication";

  await ctx.reply(`https://t.me/tfasoft_test_bot?start=${payload}`);

  // const { id } = ctx.message.from;

  // const buttons = [];

  // try {
  //   const { data } = await API.get(`users/${id}`);

  //   buttons.push([
  //     {
  //       text: "Get access token",
  //       callback_data: "login",
  //     },
  //   ]);
  //   buttons.push([
  //     {
  //       text: "My info",
  //       callback_data: "info",
  //     },
  //     {
  //       text: "My logins",
  //       callback_data: "logs",
  //     },
  //   ]);
  // } catch (error) {
  //   buttons.push([
  //     {
  //       text: "Register",
  //       callback_data: "register",
  //     },
  //   ]);
  // }

  // const messages = [
  //   "I can help you with a modern way to authenticate with Telegram.",
  //   "You can register, login or see your status by clicking the buttons.",
  //   "\nFor more information, head over to https://tfasoft.com.",
  // ];

  // const message = messages.join("\n");

  // const buttonsMarkup = {
  //   reply_markup: {
  //     inline_keyboard: buttons,
  //   },
  // };

  // await ctx.reply(message, buttonsMarkup);
};
