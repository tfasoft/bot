export const START = async (ctx) => {
  const message =
    "I can help you with a modern way to authenticate with Telegram.\nYou can register, login or see your status by clicking the buttons.";

  const buttons = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Register",
            callback_data: "register",
          },
          {
            text: "Login",
            callback_data: "login",
          },
        ],
        [
          {
            text: "Connect to mobile",
            callback_data: "connect",
          },
        ],
        [
          {
            text: "My info",
            callback_data: "info",
          },
        ],
      ],
    },
  };

  await ctx.reply(message, buttons);
};
