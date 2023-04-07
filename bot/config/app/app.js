import env from "$bot/env/index.js";

export default {
  environment: env.APP_ENVIRONMENT,
  published: env.APP_ENVIRONMENT === "production" ? true : false,
};
